const DateHandler = require("../helpers/DateHandler.js");
const { mysqlDataBase, mysqlAsyncQuery } = require("../../config/mysqlConfig.js");
const findAll = (req, res, next) => {
    mysqlDataBase.query("SELECT * FROM channel", function(error, results, fields) {
        if (error) next(error);
        else res.status(200).json(results);
    });
};

const findAllByGroup = (req, res, next) => {
    mysqlDataBase.query(
        `SELECT cg.name as channel_group_name, cg.id as channel_group_id, c.name as channel_name, c.id as channel_id FROM channel_group as cg JOIN channel as c ON c.channel_group_id = cg.id;`,
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
                            link : '/channel/' + e.channel_id,
                            name : e.channel_name                            
                        })
                })

                res.status(200).json(channelsByGroup);
            }
        }
    );
};

const findAllPostOfChannel = (req,res,next) => {
    const limit = req.query.limit || 18446744073709551615; //La plus grande limit possible
    const offset = req.query.offset || 0;

        mysqlDataBase.query(
            `SELECT p.*, GROUP_CONCAT(i.user_id) as list_user_id, i.emoji_id FROM (
                SELECT p.*, u.username as user_username, u.avatar as user_avatar FROM (
                    SELECT p.* FROM (SELECT * FROM post WHERE channel_id = ? ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}) as p
                    UNION
                    SELECT c.* FROM 
                    (SELECT * FROM post WHERE channel_id = ? ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}) as p
                    JOIN post as c
                    ON p.id = c.post_id        
                ) as p
                LEFT JOIN user as u
                ON p.user_id = u.id        
            ) as p
            LEFT OUTER JOIN interaction as i
            ON i.post_id = p.id 
            GROUP BY p.id, i.emoji_id;`,
            [req.params.id, req.params.id],
            (error, listRow, fields) => {
                if (error) next(error);
                else {
                    const listPost = {};

                    //Ajoute les interactions à tous les post (post et comment)
                    listRow.forEach(row => {
                        const { emoji_id, list_user_id, ...rest } = row; 
                        const post = { ...rest, created_at : DateHandler.getDateFromNow(rest.created_at), listReaction : [], listComment : [] };

                        if(!listPost[post.id]) listPost[post.id] = post
                        if(list_user_id != null) listPost[post.id].listReaction.push({ emoji_id, list_user_id });
                    });

                    //Ajoute les post recursif (comment) au post, puis delete les post recursif 
                    for (const i in listPost) {
                        if(listPost[i].post_id != null){
                            listPost[listPost[i].post_id].listComment.push(listPost[i]);
                            delete listPost[i];
                        } 
                    }

                    res.status(200).json(listPost);
                }
            }
        );



}

const findOne = (req, res, next) => {
    mysqlDataBase.query("SELECT * FROM channel WHERE id = ?", [req.params.id], function(error, results, fields) {
        if (error) next(error);
        else res.status(200).json(results);
    });
};

const create = (req, res, next) => {
    const channel = req.body.channel;
    mysqlDataBase.query(
        "INSERT INTO channel (name,description,channel_group_id) VALUES(?, ? ,?) ",
        [channel.name, channel.description, channel.channel_group_id],
        function(error, results, fields) {
            if (error) next(error);
            else res.status(200).json(results);
        }
    );
};

const modify = (req, res, next) => {
    const channel = req.body.channel;
    mysqlDataBase.query(
        "UPDATE channel SET name = ?, description = ?, channel_group_id = ? WHERE id = ?",
        [channel.name, channel.description, channel.channel_group_id, req.params.id],
        function(error, results, fields) {
            if (error) next(error);
            else res.status(200).json(results);
        }
    );
};

const remove = (req, res, next) => {
    const channel = req.body.channel;
    mysqlDataBase.query("DELETE FROM channel WHERE id = ?", [req.params.id], function(error, results, fields) {
        if (error) next(error);
        else res.status(200).json(results);
    });
};

module.exports = { findAll, findOne, create, modify, remove, findAllByGroup, findAllPostOfChannel };
