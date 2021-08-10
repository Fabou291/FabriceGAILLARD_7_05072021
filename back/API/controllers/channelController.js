const DateHandler = require("../helpers/DateHandler.js");
const { mysqlDataBase } = require("../../config/mysqlConfig.js");
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

/*
SELECT p.id as p_id, p.content as p_content, UNIX_TIMESTAMP(p.created_at) as p_timestamp,
    p_user.id as p_user_id, p_user.username as p_user_username, p_user.avatar as p_user_avatar,
c.id as c_id, c.content as c_content, UNIX_TIMESTAMP(c.created_at) as c_timestamp,
    c_user.id as p_user_id, c_user.username as p_user_username, c_user.avatar as p_user_avatar
FROM post as p
LEFT JOIN user as p_user
ON p_user.id = p.user_id
LEFT JOIN comment as c
ON p.id = c.post_id
LEFT JOIN user as c_user
ON c_user.id = c.user_id
WHERE channel_id = 1
ORDER BY p.created_at DESC;
*/


/*
SELECT p.id as p_id, c.id as c_id
FROM post as p
LEFT JOIN user as p_user
ON p_user.id = p.user_id
LEFT JOIN comment as c
ON p.id = c.post_id
LEFT JOIN user as c_user
ON c_user.id = c.user_id
WHERE channel_id = 1
ORDER BY p.created_at DESC;
*/



/*
SELECT p.id as p_id, p.content as p_content, UNIX_TIMESTAMP(p.created_at) as p_timestamp,
    p_user.id as p_user_id, p_user.username as p_user_username, p_user.avatar as p_user_avatar,
c.id as c_id, c.content as c_content, UNIX_TIMESTAMP(c.created_at) as c_timestamp,
    c_user.id as p_user_id, c_user.username as p_user_username, c_user.avatar as p_user_avatar
FROM
(SELECT * FROM post ORDER BY created_at DESC LIMIT 10 OFFSET 0) as p
LEFT JOIN user as p_user
ON p_user.id = p.user_id
LEFT JOIN comment as c
ON p.id = c.post_id
LEFT JOIN user as c_user
ON c_user.id = c.user_id
WHERE channel_id = 1
ORDER BY p.created_at DESC;
*/


/*const findAllPostOfChannel = (req,res,next) => {
    const limit = req.query.limit || 18446744073709551615; //La plus grande limit possible
    const offset = req.query.offset || 0;
    mysqlDataBase.query(`SELECT post.*, UNIX_TIMESTAMP(post.created_at) as timestamp FROM post WHERE channel_id = ? ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`, [req.params.id], function(error, results, fields) {
        if (error) next(error);
        else{
            results.forEach(post => {
                const dateHandler = new DateHandler(post.timestamp);
                post.date = dateHandler.getDateFromNow();
                return post;
            })
            res.status(200).json(results);
        }
    });
}*/

const findAllPostOfChannel = (req,res,next) => {
    const limit = req.query.limit || 18446744073709551615; //La plus grande limit possible
    const offset = req.query.offset || 0;
    mysqlDataBase.query(
        `SELECT p.id as p_id, p.content as p_content, UNIX_TIMESTAMP(p.created_at) as p_timestamp,
                p_user.id as p_user_id, p_user.username as p_user_username, p_user.avatar as p_user_avatar,
                c.id as c_id, c.content as c_content, UNIX_TIMESTAMP(c.created_at) as c_timestamp,
                c_user.id as c_user_id, c_user.username as c_user_username, c_user.avatar as c_user_avatar
        FROM
        (SELECT * FROM post ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}) as p
        LEFT JOIN user as p_user
        ON p_user.id = p.user_id
        LEFT JOIN comment as c
        ON p.id = c.post_id
        LEFT JOIN user as c_user
        ON c_user.id = c.user_id
        WHERE channel_id = 1
        ORDER BY p.created_at DESC;`, 
        [req.params.id], function(error, results, fields) {
        if (error) next(error);
        else{

            let listPost = [];

            results.forEach((e,i) => {
                const dateHandler_post = new DateHandler(e.p_timestamp);
                const post = {
                    id : e.p_id,
                    content : e.p_content,
                    created_at : dateHandler_post.getDateFromNow(),
                    user : {
                        id : e.p_user_id,
                        username : e.p_user_username,
                        avatar : e.p_user_avatar,
                    },
                    listComment : [],
                };

                const dateHandler_comment = new DateHandler(e.c_timestamp);
                const hasSameId = post => post.id == e.p_id;
                if(listPost.findIndex(hasSameId) == -1) listPost.push(post);
                
                if(e.c_id != null){
                    listPost[listPost.findIndex(hasSameId)].listComment.push({
                        id : e.c_id,
                        content : e.c_content,
                        created_at : dateHandler_comment.getDateFromNow(),
                        user : {
                            id : e.c_user_id,
                            avatar : e.c_user_avatar,
                            username : e.c_user_username
                        }                        
                    })
                }

            })
            res.status(200).json(listPost);
        }
    });
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
