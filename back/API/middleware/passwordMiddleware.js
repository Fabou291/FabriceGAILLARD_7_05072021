import passwordValidator from 'password-validator';
import createError from "http-errors";
import bcrypt from "bcrypt";
import fs from 'fs';

const getSchema = () => {
    //const rawdata = fs.readFileSync('commonPass.json');
    //Object.values(JSON.parse(rawdata))

    return new passwordValidator()
        .is().min(8)
        .is().max(100)
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

const encrypt = (req,res,next) => {

    bcrypt
        .hash(req.body.password, 10)
        .then(function(hash) {
            req.body.password = hash;
            next();
        })
        .catch(e => next(e));

}

export default { checkValidity, encrypt }



