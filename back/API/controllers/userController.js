import mysqlDataBase from "../../config/mysqlConfig.js";
import createError from "http-errors";

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
    try{
        const user = req.body.user;
        mysqlDataBase.query(
            `
                INSERT INTO user (username,avatar,email,password, role_id)
                VALUES ( ?, ?, ?, ?, (SELECT id FROM role WHERE name = "user") )
            `,
            [ user.username, user.avatar, user.email, user.password, "user" ],
            function (error, results, fields) {
                if (error) next(error);
                else res.status(202).send({results});
            }
        );        
    }
    catch(e){
        next(e)
    }
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

export default { findAll, findOne, create, modify, remove }