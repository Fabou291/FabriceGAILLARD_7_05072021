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

const findAllPostOfChannel = (req,res,next) => {
    mysqlDataBase.query("SELECT post.*, UNIX_TIMESTAMP(post.created_at) as timestamp FROM post WHERE channel_id = ? ORDER BY created_at DESC LIMIT 10;", [req.params.id], function(error, results, fields) {
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
