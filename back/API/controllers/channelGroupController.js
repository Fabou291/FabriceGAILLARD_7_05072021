const {mysqlDataBase} = require("../../config/mysqlConfig.js");

/**
 * @name findAll
 * @description Récupère l'ensemble des groupes de channel(s).
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM channel_group',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name findOne
 * @description Récupère un groupe de channel(s) en fonction de son id.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM channel_group WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name create
 * @description Crée un nouveau groupe de channel(s).
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const create = (req,res,next) => {
    mysqlDataBase.query( "INSERT INTO channel_group (name) VALUES(?) ", [req.body.name], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name modify
 * @description Modifie un groupe de channel(s) existant.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const modify = (req,res,next) => {
    mysqlDataBase.query( "UPDATE channel_group SET name = ? WHERE id = ?", [req.body.name,req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name remove
 * @description Supprime un groupe de channel(s) en fonction de son id.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const remove = (req,res,next) => {
    mysqlDataBase.query( "DELETE FROM channel_group WHERE id = ?", [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}


module.exports = { findAll, findOne, create, modify, remove }