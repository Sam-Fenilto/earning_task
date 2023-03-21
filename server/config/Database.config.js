const mysql = require('mysql2/promise'); // node mysql 

// includes
const MainConfig = require('./Main.config');

const DatabaseConnection = mysql.createPool({
  connectionLimit: 100,
  host: MainConfig["NODE_DB_HOST"],
  user: MainConfig["NODE_DB_USER"],
  password: MainConfig["NODE_DB_PASSWORD"],
  database: MainConfig["NODE_DB_DATABASE"],
  charset: 'utf8mb4',
  debug: false
});
console.log('db connected!');

module.exports = DatabaseConnection;