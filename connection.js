const mysql = require('mysql');
const connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Employee'
});

connection.connect((err) => {
    if (!err) {
        console.log('MySQL connection successful!!');
    } else {
        console.log(err);
    }
});

module.exports = connection;