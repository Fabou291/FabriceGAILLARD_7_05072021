const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '../../../.env' })



/**
 * @function verifAuthentication
 * @description Vérifie que l'authentification de l'utilisateur est valide
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifAuthentication = (req, res, next) => {
    
    try {
        if (!req.headers.authorization) throw createHttpError.Unauthorized("Not Authenticated");

        const { userId } = JWT.verify(
            req.headers.authorization.split(" ")[1],
            process.env.SECRET_ACCESS_TOKEN
        );
        
        req.userId = userId;
        return next();  

    } catch (error) {
        return next(error);
    }
};

module.exports = verifAuthentication;
