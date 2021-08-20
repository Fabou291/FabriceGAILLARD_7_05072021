const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { mysqlAsyncQuery } = require("../../config/mysqlConfig.js");



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

        const accessToken = req.headers.authorization.split(" ")[1];

         JWT.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                if (err.name == "TokenExpiredError")
                    return next("TokenExpiredError") // Retourner un code erreur spécifique pour que le front comprenne qu'il faille refresh le token
                return next(err);
            }
            else{
                if (req.userId && req.userId !== decoded.userId) return next(createHttpError.Unauthorized("Unauthorized - 1"));
                else{
                    req.userId = decoded.userId;
                    return next();  
                }               
            }
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = verifAuthentication;
