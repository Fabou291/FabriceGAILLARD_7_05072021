const passwordValidator = require('password-validator');
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const fs = require('fs');

/**
 * @name getSchema
 * @description Récupère le Schema déterminant les règle pour la validation du password
 * @returns {*}
 */
const getSchema = () => {
    //const rawdata = fs.readFileSync('commonPass.json');
    //Object.values(JSON.parse(rawdata))

    return new passwordValidator()
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()
        .is().not().oneOf([]); 
}

/**
 * @name checkValidity
 * @description Détermine si un password est valide ou non
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkValidity = (req,res,next) => {

    if(getSchema().validate(req.body.password)) 
        next();
    else 
        next(createError.BadRequest('Invalid password'));

}

/**
 * @name checkToReset
 * @description Détermine si l'ancien et le nouveau password sont valide
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkToReset = (req,res,next) => {
    try{
        if(req.body.password == req.body.oldPassword)
            throw createError.BadRequest('New and old password can\'t be identical.');
        if(req.body.password != req.body.confirmationPassword)
            throw createError.BadRequest('New password and his confirmation must be identical.');           
        next();        
    }
    catch(e){
        next(e)
    }

}

/**
 * @name encrypt
 * @description Encrypt le password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const encrypt = (req,res,next) => {

    bcrypt
        .hash(req.body.password, 10)
        .then(function(hash) {
            req.body.password = hash;
            next();
        })
        .catch(e => next(e));

}

module.exports = { checkValidity, checkToReset, encrypt }



