const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const getAccessToken = (userId) => {
    return JWT.sign({ userId }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
};

const getRefreshToken = (userId) => {
    return JWT.sign({ userId }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "1d" });
};

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        try{
            JWT.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, decoded) => {
                {
                    if (err) return reject(err)
                    else return resolve(decoded);              
                }
            })            
        }
        catch(error){
            reject(error)
        }

    })
}



module.exports = { getAccessToken, getRefreshToken, verifyRefreshToken };
