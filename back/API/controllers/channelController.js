const DateHandler = require("../helpers/DateHandler.js");
const { mysqlDataBase, mysqlAsyncQuery } = require("../../config/mysqlConfig.js");
const createHttpError = require("http-errors");
const xss = require("xss");

/**
 * @name findAll
 * @description Récupère l'ensemble des channels.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const findAll = (req, res, next) => {
    mysqlDataBase.query("SELECT * FROM channel", function(error, results, fields) {
        if (error) next(error);
        else res.status(200).json(results);
    });
};

/**
 * @name findAllByGroup
 * @description Récupère l'ensemble des channels par groupe.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const findAllByGroup = (req, res, next) => {
    mysqlDataBase.query(
        `SELECT cg.name as channel_group_name, cg.id as channel_group_id, 
        c.name as channel_name, c.description as channel_description, c.id as channel_id FROM channel_group as cg JOIN channel as c ON c.channel_group_id = cg.id;`,
        function(error, results, fields) {
            if (error) next(error);
            else {
 
                let channelsByGroup = [];
                
                results.forEach((e,i) => {
                    const groupObject = {
                        id : e.channel_group_id,
                        name : e.channel_group_name,
                        listChannel : []
                    };

                    const hasSameId = group => group.id == e.channel_group_id;

                    if(i==0) channelsByGroup.push(groupObject);
                    else if(channelsByGroup.findIndex(hasSameId) == -1) channelsByGroup.push(groupObject);
                    

                    channelsByGroup[channelsByGroup.findIndex(hasSameId)].listChannel.push({
                            id : e.channel_id,
                            name : e.channel_name,
                            description : e.channel_description                            
                        })
                })

                res.status(200).json(channelsByGroup);
            }
        }
    );
};

/**
 * @name findAllPostOfChannel
 * @description Récupère l'ensemble des posts pour un channel.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const findAllPostOfChannel = (req,res,next) => {
    const limit = req.query.limit || 18446744073709551615; //La plus grande limit possible
    const offset = req.query.offset || 0;

        mysqlDataBase.query(
            `SELECT p.*, GROUP_CONCAT(i.user_id ORDER BY i.id) as list_user_id, GROUP_CONCAT(i.id ORDER BY i.id) as list_reaction_id, i.emoji_unicode FROM (
                SELECT p.*, u.username as user_username, u.avatar as user_avatar FROM (
                    SELECT p.* FROM (SELECT * FROM post WHERE channel_id = ? AND post_id IS NULL ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}) as p
                    UNION
                    SELECT c.* FROM 
                    (SELECT * FROM post WHERE post_id IS NOT NULL ORDER BY created_at DESC) as c
                    JOIN (SELECT * FROM post WHERE channel_id = ? AND post_id IS NULL ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}) as p
                    ON p.id = c.post_id
                ) as p
                LEFT JOIN user as u
                ON p.user_id = u.id
            ) as p
            LEFT OUTER JOIN reaction as i
            ON i.post_id = p.id 
            GROUP BY p.id, i.emoji_unicode
            ORDER BY p.created_at DESC, i.id;`,
            [req.params.id, req.params.id],
            (error, listRow, fields) => {
                if (error) next(error);
                else {
                    const listPost = [];
 

                    const exist = post => listPost.findIndex(e => e.id == post.id) != -1;
                    const get = id => listPost.find(e => e.id == id);

                    //Ajoute les reactions à tous les post (post et comment)
                    listRow.forEach(row => {
                        const { emoji_unicode, list_user_id, list_reaction_id, ...rest } = row; 
                        const post = { ...rest, created_at : DateHandler.getDateFromNow(rest.created_at), listReaction : [], listComment : [] };

                        if(!exist(post)) listPost.push(post)
                        if(list_user_id != null) get(post.id).listReaction.push({ emoji_unicode, list_user_id : list_user_id.split(','), list_reaction_id : list_reaction_id.split(',') });
                    });


                    //Ajoute les post recursif (comment) au post, puis delete les post recursif 
                    for (let i = 0; i<listPost.length; i++) {
                        const post = listPost[i]
                        if(post.post_id != null){
                            get(post.post_id).listComment.push(
                                listPost.splice(listPost.indexOf(post),1)[0]
                            );
                            --i;
                        } 
                    }



                    res.status(200).json(listPost);
                }
            }
        );



}

/**
 * @name findOne
 * @description Récupère un Channel en fonction de son id.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const findOne = (req, res, next) => {
    mysqlDataBase.query("SELECT * FROM channel WHERE id = ?", [req.params.id], function(error, results, fields) {
        if (error) next(error);
        else res.status(200).json(results);
    });
};

/**
 * @name create
 * @description Crée un nouveau channel.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const create = (req, res, next) => {
    if(!req.isAdmin) next(createHttpError('Unhautorized to create a channel'))
    else{
        mysqlDataBase.query(
            "INSERT INTO channel (name,description,channel_group_id) VALUES(?, ? ,?)",
            [xss(req.body.name), xss(req.body.description), req.body.channelGroupId],
            function(error, results, fields) {
                if (error) next(error);
                else res.status(200).json(results);
            }
        );        
    }
};

/**
 * @name modify
 * @description Modifie un channel existant en fonction de son id.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const modify = (req, res, next) => {
    mysqlDataBase.query(
        `UPDATE channel SET name = ?, description = ?, channel_group_id = ? WHERE id = ? AND ?`,
        [xss(req.body.name), xss(req.body.description), req.body.channelGroupId, req.params.id, req.isAdmin],
        function(error, results, fields) {
            if (error) next(error);
            else res.status(200).json(results);
        }
    );
};

/**
 * @name remove
 * @description Supprime un channel en fonction de son id.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const remove = (req, res, next) => {
    mysqlDataBase.query("DELETE FROM channel WHERE id = ? AND ?", [req.params.id,req.isAdmin], function(error, results, fields) {
        if (error) next(error);
        else res.status(200).json(results);
    });
};

module.exports = { findAll, findOne, create, modify, remove, findAllByGroup, findAllPostOfChannel };
