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
    const imageUrl = req.file ? req.file.filename : null ;
    mysqlDataBase.query( "INSERT INTO post (content, channel_id, post_id, image_url, user_id) VALUES(?,?,?,?,?)", [req.body.content, parseInt(req.body.channelId), JSON.parse(req.body.postId), imageUrl, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({ id : results.insertId, imageUrl })
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
        if(error) next(error)
        else res.status(200).send(results)
    })
}


module.exports = { findAll, findOne, create, modify, remove }