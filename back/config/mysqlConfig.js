import mysql from "mysql";

const  dataBase = mysql.createConnection({
    host     : 'localhost',
    user     : '',
    password : '',
    database : 'groupomania_social_network'
});

export default dataBase;