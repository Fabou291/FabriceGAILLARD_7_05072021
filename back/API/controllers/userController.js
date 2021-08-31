const {mysqlDataBase, mysqlAsyncQuery} = require("../../config/mysqlConfig.js");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const imageHelper = require("../helpers/ImageHelper.js");

const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM user', function (error, results, fields) {
        if (error) next(error);
        else res.status(200).send({listUser : results});
    });
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM user WHERE id= ?', [req.params.id] , function (error, results, fields) {
        if (error) next(error);
        else res.status(200).send(results[0]);
    });
}

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

const modify = async (req,res,next) => {
    try{
        if(req.file){
            req.body.avatar = req.file.filename;
            const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE id = ? AND id = ?", [req.params.id, req.userId]))[0];
            if(user.avatar != null && !/avatarDefaultSet/.test(user.avatar)) await imageHelper.remove(user.avatar);
        } 

        await mysqlAsyncQuery(
            "UPDATE user SET username = ?, avatar = ?, description = ? WHERE id = ? AND id = ?", 
            [ req.body.username, req.body.avatar, req.body.description, req.params.id, req.userId ]
        );

        res.status(200).send({ avatar : req.body.avatar});
    }
    catch(e){
        next(e)
    }
}

const resetPassword = async (req,res,next) => {
    try{

        const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE id= ?;", [req.userId]))[0];
        if (!(await bcrypt.compare(req.body.oldPassword, user.password))) throw createError.BadRequest('Incorrect password')

        mysqlDataBase.query(
            `
                UPDATE user
                SET password = ?
                WHERE id = ?
            `,
            [ req.body.password, req.userId ],
            function (error, results, fields) {
                if (error) next(error);
                else if(!results.affectedRows) throw createError.BadRequest('You are note authorized to delete this user')
                else res.status(200).send(results);
            }
        );        
    }
    catch(e){
        next(e)
    }
}

const resetMail = (req,res,next) => {
    try{
        mysqlDataBase.query(
            `
                UPDATE user
                SET email = ?
                WHERE id = ? AND email = ?
            `,
            [ req.body.email, req.userId, req.body.oldMail ],
            function (error, results, fields) {
                console.log(results)
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

const remove = async (req,res,next) => {

    try{
        const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE id = ? AND _id = ?", [req.params.id, req.userId]))[0];
        if(user.image_url != null) await imageHelper.remove(user.image_url);

        const results = await mysqlAsyncQuery("DELETE FROM user WHERE id = ? AND _id = ?", [req.params.id, req.userId]);
        res.status(200).send(results);
       
    } catch(error){ next(error) }
    
}


module.exports = { findAll, findOne, create, modify, remove, resetMail, resetPassword }