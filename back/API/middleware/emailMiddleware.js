const validator = require("email-validator");

const createError = require("http-errors");
const encryptHelper = require('../helpers/encryptHelper');

/**
 * @name checkValidity
 * @description 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const checkValidity = (req,res,next) => {
    if(validator.validate(req.body.email)) next();
    else next(createError.BadRequest('Invalid email'));
}

/**
 * @name checkToReset
 * @description 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkToReset = (req,res,next) => {
    try{
        if(req.body.email == req.body.userId)
            throw createError.BadRequest('New and old e-mail can\'t be the same.');
            req.body.oldMail = encryptHelper.handleMailEncryption(req.body.oldMail);
        next();
    } catch(e) {
        next(e)
    }

}

/**
 * @name encrypt
 * @description 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const encrypt = (req, res, next) => {
    req.body.email = encryptHelper.handleMailEncryption(req.body.email);
    next();
};


module.exports = {checkValidity, checkToReset, encrypt};