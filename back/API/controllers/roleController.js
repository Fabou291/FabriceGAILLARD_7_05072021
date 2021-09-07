const {mysqlDataBase} = require("../../config/mysqlConfig.js");
const createError = require("http-errors");
/**
 * @name findAll
 * @description Récupère l'ensemble des rôles.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM role',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name findOne
 * @description Récupère un rôle en fonction de son id.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM role WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name create
 * @description Crée un nouveau rôle.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const create = (req,res,next) => {
    if(!req.isAdmin) next(createError.Unauthorized('Unauthorized to create a role'))
    else{
        mysqlDataBase.query( "INSERT INTO role (name) VALUES(?)", [req.body.role.name], function(error, results, fields){
            if(error) next(error)
            else res.status(200).send(results)
        })
    }
}

/**
 * @name modify
 * @description Modifie un rôle existant en fonction de son id.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const modify = (req,res,next) => {
    mysqlDataBase.query( "UPDATE role SET name = ? WHERE id = ? AND ?", [req.body.role.name,req.params.id, req.isAdmin], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name remove
 * @description Supprime un nouveau rôle en fonction de son id. 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const remove = (req,res,next) => {
    mysqlDataBase.query( "DELETE FROM role WHERE id = ? AND ?", [req.params.id, req.isAdmin], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}


module.exports = { findAll, findOne, create, modify, remove }