import {mysqlDataBase} from "../../config/mysqlConfig.js";
const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM comment',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM comment WHERE id = ?', [req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const create = (req,res,next) => {
    const comment = req.body.comment;
    req.userId = 1
    mysqlDataBase.query( "INSERT INTO comment (content, post_id, user_id) VALUES(?, ?, ?)", [comment.content, comment.post_id, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const modify = (req,res,next) => {
    const  comment = req.body.comment;
    req.userId = 1;
    mysqlDataBase.query( "UPDATE comment SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?", [comment.content, req.params.id, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const remove = (req,res,next) => {
    req.userId = 1;
    mysqlDataBase.query( "DELETE FROM comment WHERE id = ? AND user_id = ?", [req.params.id, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}


export default { findAll, findOne, create, modify, remove }