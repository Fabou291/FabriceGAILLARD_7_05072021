import mysql from "mysql";

const  dataBase = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'GSG291gsg+',
    database : 'groupomania_social_network'
});


export default dataBase;