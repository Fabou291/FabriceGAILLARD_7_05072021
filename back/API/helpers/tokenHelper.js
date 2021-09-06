const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '../../../.env' });


/**
 * @name getAccessToken
 * @description Récupère/Crée un Access Token
 * @param {Number} userId 
 * @returns 
 */
const getAccessToken = (userId) => {
    return JWT.sign({ userId }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
};

/**
 * @name getRefreshToken
 * @description Récupère/Crée un Refresh Token
 * @param {Number} userId 
 * @returns 
 */
const getRefreshToken = (userId) => {
    return JWT.sign({ userId }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "1d" });
};

module.exports = { getAccessToken, getRefreshToken };
