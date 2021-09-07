const { mysqlAsyncQuery } = require("../../config/mysqlConfig.js");
const tokenHelper = require("../helpers/tokenHelper.js");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '../../../.env' });

/**
 * @function login
 * @description Authentifie l'utilisateur si les conditions suivantes sont réunie :
 *  - Si le mail est présent en bdd
 *  - Si son nombre de tentative n'excède pas 5 dans le temps limite impartie (protection contre brute force)
 *  - Si le password est correcte
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const login = async (req, res, next) => {
    const delay = 5, attempt_limit = 5;

    try {
        const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE email= ?;", [req.body.email]))[0];
        if (!user) throw createError.BadRequest("Email not registered");

        const user_statu = (await mysqlAsyncQuery(
            `SELECT RIGHT(SEC_TO_TIME((?*60) - TIMESTAMPDIFF(SECOND, created_at, CURRENT_TIMESTAMP )),4) as remaining_time, COUNT(*) as is_blocked
            FROM blocked_user WHERE created_at >= (CURRENT_TIMESTAMP - INTERVAL ? MINUTE) AND user_id = ?;`,
            [delay, attempt_limit, user.id]
        ))[0];

        if (user_statu && user_statu.is_blocked)
        throw createError.BadRequest(`Account locked, remaining time : ${user_statu.remaining_time} minutes`);

        if (!(await bcrypt.compare(req.body.password, user.password))) {
            await mysqlAsyncQuery("INSERT INTO log_fail (user_id, ip, message) VALUES (?, ?, 'password fail')", [
                user.id,
                "une adresse ip",
            ]);

            throw createError.BadRequest(
                (await mysqlAsyncQuery("CALL login_fail(?, ?, ?, ?)", [user.id, "adress_ip", delay, attempt_limit]))[0][0].message
            );
        }

        await mysqlAsyncQuery("UPDATE user SET refresh_token = ? WHERE id=  ?", [tokenHelper.getRefreshToken(user.id, user.role_id), user.id]);

        const accessToken = tokenHelper.getAccessToken(user.id , user.role_id)

        res.status(200).send({ 
            user,
            accessToken
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @function refreshToken
 * @description Refresh le l'access token si le refresh token est valide.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const refreshToken = async (req, res, next) => {
    try{
        if (!req.headers.authorization) throw createHttpError.Unauthorized("Not authorized");

        const { userId, roleId } = JWT.decode(req.headers.authorization.split(" ")[1]);

        const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE id= ?;", [userId]))[0];
        if (!user) throw createError.BadRequest("Invalid user");

        JWT.verify(user.refresh_token, process.env.SECRET_REFRESH_TOKEN);
        
        res.status(200).json({ accessToken : tokenHelper.getAccessToken(userId, roleId) })
    } catch(error){
        if(error.message == 'jwt expired') error = createError.Unauthorized("Refresh token invalid");
        next(error);
    }
}

module.exports = { login, refreshToken };
