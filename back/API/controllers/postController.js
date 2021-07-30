import {mysqlDataBase} from "../../config/mysqlConfig.js";
const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const create = (req,res,next) => {
    const post = req.body.post;
    req.userId = 1
    mysqlDataBase.query( "INSERT INTO post (content, channel_id, user_id) VALUES(?,?,?)", [post.content, post.channelId, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const modify = (req,res,next) => {
    req.userId = 1
    const  post = req.body.post;
    mysqlDataBase.query( "UPDATE post SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?", [post.content, req.params.id, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const remove = (req,res,next) => {
    const  post = req.body.post;
    req.userId = 1
    mysqlDataBase.query( "DELETE FROM post WHERE id = ? AND user_id = ?", [req.params.id, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}


export default { findAll, findOne, create, modify, remove }