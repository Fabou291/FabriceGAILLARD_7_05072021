const {mysqlDataBase} = require("../../config/mysqlConfig.js");

const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}


const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

const create = (req,res,next) => {
    mysqlDataBase.query( "INSERT INTO post (content, channel_id, post_id, user_id) VALUES(?,?,?,?)", [req.body.content, req.body.channelId, req.body.postId, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

const modify = (req,res,next) => {
    mysqlDataBase.query( "UPDATE post SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?", [req.body.content, req.params.id, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

const remove = (req,res,next) => {
    const  post = req.body.post;
    req.userId = 1
    mysqlDataBase.query( "DELETE FROM post WHERE id = ? AND user_id = ?", [req.params.id, req.userId], function(error, results, fields){
        console.log(results)
        if(error) next(error)
        else res.status(200).send(results)
    })
}


module.exports = { findAll, findOne, create, modify, remove }