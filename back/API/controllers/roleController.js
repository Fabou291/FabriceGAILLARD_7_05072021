import {mysqlDataBase} from "../../config/mysqlConfig.js";

const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM role',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM role WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const create = (req,res,next) => {
    mysqlDataBase.query( "INSERT INTO role (name) VALUES(?)", [req.body.role.name], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const modify = (req,res,next) => {
    mysqlDataBase.query( "UPDATE role SET name = ? WHERE id = ?", [req.body.role.name,req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const remove = (req,res,next) => {
    mysqlDataBase.query( "DELETE FROM role WHERE id = ?", [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}


export default { findAll, findOne, create, modify, remove }