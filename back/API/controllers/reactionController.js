const {mysqlDataBase} = require("../../config/mysqlConfig.js");
const createError = require("http-errors");

/**
 * @name create
 * @description Crée une nouvelle réaction
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const create = (req,res,next) => {
    mysqlDataBase.query( "INSERT INTO reaction (user_id, emoji_unicode, post_id) VALUES(?,?,?)", [req.userId, req.body.emojiUnicode, req.body.postId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({ insertId : results.insertId})
    })
}

/**
 * @name remove
 * @description Supprime une réaction existante
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const remove = (req,res,next) => {
    mysqlDataBase.query( "DELETE FROM reaction WHERE id = ? AND user_id = ?", [req.params.id, req.userId], function(error, results, fields){
        if(error) next(error)
        if(results.affectedRows == 0) next(createError.BadRequest('Nothing to delete'))
        else res.status(200).send(results)
    })
}


module.exports = { create, remove }