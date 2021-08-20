const passwordValidator = require('password-validator');
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const fs = require('fs');

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


const checkValidity = (req,res,next) => {

    if(getSchema().validate(req.body.password)) 
        next();
    else 
        next(createError.BadRequest('Invalid password'));

}

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



