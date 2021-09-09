const {mysqlDataBase, mysqlAsyncQuery} = require("../../config/mysqlConfig.js");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const imageHelper = require("../helpers/ImageHelper.js");


/**
 * @name findAll
 * @description Récupère l'ensemble des utilisateurs.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM user', function (error, results, fields) {
        if (error) next(error);
        else res.status(200).send({listUser : results});
    });
}

/**
 * @name findOne
 * @description Récupère un utilisateur en fonction de son id.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM user WHERE id= ?', [req.params.id] , function (error, results, fields) {
        if (error) next(error);
        else res.status(200).send(results[0]);
    });
}

/**
 * @name create
 * @description Crée un nouvel utilisateur.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const create = (req,res,next) => {
    mysqlDataBase.query(
        `
            INSERT INTO user (username,avatar,email,password, role_id)
            VALUES ( ?, ?, ?, ?, (SELECT id FROM role WHERE name = "user") )
        `,
        [ req.body.username, req.body.avatar, req.body.email, req.body.password, "user" ],
        function (error, results, fields) {
            if (error){
                if(error.sqlState == "23000") next(createError.BadRequest('Email already exist'))
                else next(error);
            } 
            else res.status(202).send(results);
        }
    );        
}

/**
 * @name modify
 * @description Modifie un utilisateur existant en fonction de son id.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const modify = async (req,res,next) => {
    try{
        req.body.description = (req.body.description == 'null') ? null : req.body.description ;
        if(req.file){
            req.body.avatar = "http://localhost:3000/images/" + req.file.filename;
            const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE id = ? AND (id = ? OR ?)", [req.params.id, req.userId, req.isAdmin]))[0];
            if(user.avatar != null && !/avatarDefaultSet/.test(user.avatar)) await imageHelper.remove(user.avatar);
        } 

        await mysqlAsyncQuery(
            "UPDATE user SET username = ?, avatar = ?, description = ? WHERE id = ? AND (id = ? OR ?)", 
            [ req.body.username, req.body.avatar, req.body.description, req.params.id, req.userId, req.isAdmin ]
        );

        res.status(200).send({ avatar : req.body.avatar});
    }
    catch(e){
        next(e)
    }
}

/**
 * @name resetPassword
 * @description Renouvelle le mot de passe de l'utilisateur.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const resetPassword = async (req,res,next) => {
    try{

        if(!req.isAdmin){
            const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE id= ? AND id = ?;", [req.params.id, req.userId]))[0];
            if (!(await bcrypt.compare(req.body.oldPassword, user.password))) throw createError.BadRequest('Incorrect password')            
        }


        mysqlDataBase.query(
            `
                UPDATE user
                SET password = ?
                WHERE id = ? AND id = ? ;
            `,
            [ req.body.password, req.params.id, req.userId ],
            function (error, results, fields) {
                if (error) next(error);
                else if(!results.affectedRows) throw createError.BadRequest('You are note authorized to change the password')
                else res.status(200).send(results);
            }
        );        
    }
    catch(e){
        next(e)
    }
}

/**
 * @name resetMail
 * @description Renouvelle l'email de l'utilisateur.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const resetMail = async (req,res,next) => {
    try{
        
        mysqlDataBase.query(
            `
                UPDATE user
                SET email = ?
                WHERE id = ? AND (email = ? AND id = ?) 
            `,
            [ req.body.email, req.params.id, req.body.oldMail, req.userId ],
            function (error, results, fields) {

                if (error) next(error);
                else if(!results.affectedRows) next(createError.BadRequest("L'email ne correspond à celle que vous detenez actuellement"))
                else res.status(200).send(results);
            }
        );        
    }
    catch(e){
        next(e)
    }
}

/**
 * @name remove
 * @description Supprime l'utilisateur.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const remove = async (req,res,next) => {

    try{
        const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE id = ? AND (id = ? OR ?)", [req.params.id, req.userId, req.isAdmin]))[0];
        if(user.image_url != null) await imageHelper.remove(user.image_url);

        const results = await mysqlAsyncQuery("DELETE FROM user WHERE id = ? AND (id = ? OR ?)", [req.params.id, req.userId, req.isAdmin]);
        res.status(200).send(results);
       
    } catch(error){ next(error) }
    
}

module.exports = { findAll, findOne, create, modify, remove, resetMail, resetPassword }