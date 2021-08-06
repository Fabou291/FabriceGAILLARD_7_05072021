const validator = require("email-validator");
const crypto = require("crypto");
const createError = require("http-errors");


const checkValidity = (req,res,next) => {
    console.log(req.body.email)
    if(validator.validate(req.body.email)) next();
    else next(createError.BadRequest('Invalid email'));
}


const encrypt = (req, res, next) => {

    req.body.email = crypto
        .createCipheriv(
            "aes-256-gcm",
            crypto
                .createHash("sha256")
                .update(process.env.SECRET_EMAIL_KEY)
                .digest("base64")
                .substr(0, 32),
                process.env.SECRET_EMAIL_IV
        )
        .update(req.body.email, "utf8", "hex");

    next();
};


module.exports = {checkValidity, encrypt};