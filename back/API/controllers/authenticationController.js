import { mysqlAsyncQuery } from "../../config/mysqlConfig.js";
import tokenHelper from "../helpers/tokenHelper.js";
import createError from "http-errors";
import bcrypt from "bcrypt";


const login = async (req, res, next) => {
    const delay = 5, attempt_limit = 5;

    try {
        const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE email= ?;", [req.body.email]))[0];
        if (!user) throw createError.BadRequest("Email not registered");

        if (!(await bcrypt.compare(req.body.password, user.password))) {
            await mysqlAsyncQuery("INSERT INTO log_fail (user_id, ip, message) VALUES (?, ?, 'password fail')", [
                user.id,
                "une adresse ip",
            ]);

            const user_statu = (await mysqlAsyncQuery(
                `SELECT RIGHT(SEC_TO_TIME((?*60) - TIMESTAMPDIFF(SECOND, created_at, CURRENT_TIMESTAMP )),4) as remaining_time, COUNT(*) as is_blocked
                 FROM blocked_user WHERE created_at >= (CURRENT_TIMESTAMP - INTERVAL ? MINUTE) AND user_id = ?;`,
                [delay, delay, user.id]
            ))[0];

            

            if (user_statu && user_statu.is_blocked)
                throw createError.BadRequest(`Account locked, remaining time : ${user_statu.remaining_time} minutes`);

            throw createError.BadRequest(
                (await mysqlAsyncQuery("CALL login_fail(?, ?, ?, ?)", [user.id, "adress_ip", delay, attempt_limit]))[0][0].message
            );
        }

        await mysqlAsyncQuery("UPDATE user SET refresh_token = ? WHERE id=  ?", [tokenHelper.getRefreshToken(user.id), user.id]);
        res.status(200).send({ accessToken : tokenHelper.getAccessToken(user.id) });
    } catch (error) {
        next(error);
    }
};

export default { login };
