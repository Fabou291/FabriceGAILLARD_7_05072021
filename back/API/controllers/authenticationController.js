import mysqlDataBase from "../../config/mysqlConfig.js";
import tokenHelper from "../helpers/tokenHelper.js";
import createError from "http-errors";
import bcrypt from "bcrypt";

const login = (req, res, next) => {
    req.userId = 1;

    mysqlDataBase.query("SELECT * FROM user WHERE email= ?", [req.body.email], function(error, results, fields) {
        if (error) next(error);
        else {
            if (results.length == 0) next(createError.BadRequest("Email not registered"));
            else {
                bcrypt
                    .compare(req.body.password, results[0].password)
                    .then(function(result) {
                        if (result == false){
                            mysqlDataBase.query(
                                `
                                    INSERT INTO 
                                    UPDATE user SET refresh_token = "${refreshToken}"
                                    WHERE id=  ${results[0].id}
                                `,
                                function(error, results, fields) {
                                    if (error) next(error);
                                    else res.status(200).send({ accessToken });
                                }
                            );
                            throw createError.BadRequest("invalid password");
                        } 

                        const accessToken = tokenHelper.getAccessToken(req.userId);
                        const refreshToken = tokenHelper.getRefreshToken(req.userId);

                        mysqlDataBase.query(
                            `
                                UPDATE user SET refresh_token = "${refreshToken}"
                                WHERE id=  ${results[0].id}
                            `,
                            function(error, results, fields) {
                                if (error) next(error);
                                else res.status(200).send({ accessToken });
                            }
                        );
                    })
                    .catch((e) => next(e));
            }
        }
    });
};

export default { login };