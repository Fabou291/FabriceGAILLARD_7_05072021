const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '../../../.env' });


/**
 * @name handleMailEncryption
 * @description 
 * @param {String} email 
 * @returns 
 */
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

module.exports = { handleMailEncryption }
