import mysqlDataBase from "../../config/mysqlConfig.js";
import tokenHelper from "../helpers/tokenHelper.js";
import createError from "http-errors"


const login = (req,res,next) => {
    req.userId = 1

    mysqlDataBase.query('SELECT * FROM user WHERE email= ?', [req.body.email, req.body.password] , function (error, results, fields) {
        if (error) next(error);
        else{
            if(results.length == 0) next(createError.BadRequest('Email not registered'));
            else{
                const accessToken = tokenHelper.getAccessToken(req.userId);
                const refreshToken = tokenHelper.getRefreshToken(req.userId);

                // Update
                mysqlDataBase.query(`UPDATE user SET refresh_token = "${refreshToken}" WHERE id=  ${results[0].id}`, function (error, results, fields) {
                    if (error) next(error);
                    else res.status(200).send({ accessToken })
                })
            }
        }
    });
}


export default { login }