const {mysqlDataBase, mysqlAsyncQuery} = require("../../config/mysqlConfig.js");
const imageHelper = require("../helpers/ImageHelper.js");
const createError = require("http-errors");

/**
 * @name findAll
 * @description Récupère l'ensemble des posts.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name findOne
 * @description Récupère un post en fonction de son id.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name create
 * @description Crée un nouveau post.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const create = (req,res,next) => {
    const imageUrl = req.file ? req.file.filename : null ;
    mysqlDataBase.query( "INSERT INTO post (content, channel_id, post_id, image_url, user_id) VALUES(?,?,?,?,?)", [req.body.content, parseInt(req.body.channelId), JSON.parse(req.body.postId), imageUrl, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({ id : results.insertId, imageUrl })
    })
}

/**
 * @name modify
 * @description Modifie un post existant en fonction de son id.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const modify = (req,res,next) => {
    mysqlDataBase.query( "UPDATE post SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND (user_id = ? OR ?)", [req.body.content, req.params.id, req.userId, req.isAdmin], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

/**
 * @name remove
 * @description Supprime un post en fonction de son id.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const remove = async (req,res,next) => {
    try{

        const post = (await mysqlAsyncQuery("SELECT * FROM post WHERE id = ? AND (user_id = ? OR ?)", [req.params.id, req.userId, req.isAdmin]))[0];
        if(!post) throw createError.BadRequest("Impossible to remove this account")
        if(post.image_url != null) await imageHelper.remove(post.image_url);

        const results = await mysqlAsyncQuery("DELETE FROM post WHERE id = ? AND (user_id = ? OR ?)", [req.params.id, req.userId, req.isAdmin]);
        res.status(200).send(results);
       
    } catch(error){ 
        next(error) 
    }
}


module.exports = { findAll, findOne, create, modify, remove }