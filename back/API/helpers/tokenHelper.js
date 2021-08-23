const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const getAccessToken = (userId) => {
    return JWT.sign({ userId }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1s" });
};

const getRefreshToken = (userId) => {
    return JWT.sign({ userId }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "1d" });
};

module.exports = { getAccessToken, getRefreshToken };
