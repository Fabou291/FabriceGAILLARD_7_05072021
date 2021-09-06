const mysql = require("mysql");

const mysqlDataBase = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'GSG291gsg+',
    database : 'groupomania_social_network'
});

/**
 * @name mysqlAsyncQuery
 * @description Permet de faire des requêtes asynchrone sans callback (donc avec des promise)
 * @param {String} sql 
 * @param {Array} params 
 * @returns 
 */
const mysqlAsyncQuery = function(sql, params = []) {
    return new Promise((resolve, reject) => {
        mysqlDataBase.query(sql, params, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
};



module.exports = { mysqlDataBase, mysqlAsyncQuery };