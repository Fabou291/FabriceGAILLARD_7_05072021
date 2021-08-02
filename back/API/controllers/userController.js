const {mysqlDataBase} = require("../../config/mysqlConfig.js");
const createError = require("http-errors");

const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM user', function (error, results, fields) {
        if (error) next(error);
        else res.status(200).send({listUser : results});
    });
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM user WHERE id= ?', [req.params.id] , function (error, results, fields) {
        if (error) next(error);
        else res.status(200).send({results});
    });
}

const create = (req,res,next) => {

    const user = req.body;
    mysqlDataBase.query(
        `
            INSERT INTO user (username,avatar,email,password, role_id)
            VALUES ( ?, ?, ?, ?, (SELECT id FROM role WHERE name = "user") )
        `,
        [ user.username, user.avatar, user.email, user.password, "user" ],
        function (error, results, fields) {
            if (error){
                if(error.sqlState == "23000") next(createError.BadRequest('Email already exist'))
                else next(error);
            } 
            else res.status(202).send({results});
        }
    );        

}

const modify = (req,res,next) => {
    try{
        const user = req.body.user;
        mysqlDataBase.query(
            `
                UPDATE user
                SET username = ?, avatar = ?, email = ?, password = ?
                WHERE id = ?
            `,
            [ user.username, user.avatar, user.email, user.password, user.id ],
            function (error, results, fields) {
                if (error) next(error);
                else res.status(200).send({response : results});
        });        
    }
    catch(e){
        next(e)
    }
}

const remove = (req,res,next) => {
    mysqlDataBase.query(
        `
            DELETE FROM user
            WHERE id = ?
        `,
        [ req.params.id ],
        function (error, results, fields) {
            if (error) next(error);
            else res.status(200).send({response : results});
    });  
}

module.exports = { findAll, findOne, create, modify, remove }