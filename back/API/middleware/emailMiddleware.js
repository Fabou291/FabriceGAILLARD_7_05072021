const validator = require("email-validator");
const crypto = require("crypto");
const createError = require("http-errors");

const handleMailEncryption = (email) => {
    return crypto
        .createCipheriv(
            "aes-256-gcm",
            crypto
                .createHash("sha256")
                .update(process.env.SECRET_EMAIL_KEY)
                .digest("base64")
                .substr(0, 32),
                process.env.SECRET_EMAIL_IV
        )
        .update(email, "utf8", "hex");
}

const checkValidity = (req,res,next) => {
    if(validator.validate(req.body.email)) next();
    else next(createError.BadRequest('Invalid email'));
}

const checkToReset = (req,res,next) => {
    try{
        if(req.body.email == req.body.userId)
            throw createError.BadRequest('New and old e-mail can\'t be the same.');
            req.body.oldMail = handleMailEncryption(req.body.oldMail);
        next();
    } catch(e) {
        next(e)
    }

}

const encrypt = (req, res, next) => {
    req.body.email = handleMailEncryption(req.body.email);
    next();
};


module.exports = {checkValidity, checkToReset, encrypt};