import mysql from "mysql";

const  mysqlDataBase = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'GSG291gsg+',
    database : 'groupomania_social_network'
});

const mysqlAsyncQuery = function(sql, params = []) {
    return new Promise((resolve, reject) => {
        mysqlDataBase.query(sql, params, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
};



export { mysqlDataBase, mysqlAsyncQuery };