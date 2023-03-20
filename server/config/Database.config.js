const QueryBuilder = require('node-querybuilder'); // node mysql query builder

// includes
const MainConfig = require('./Main.config');


const settings = {
    host: MainConfig["NODE_DB_HOST"],
    database: MainConfig["NODE_DB_DATABASE"],
    user: MainConfig["NODE_DB_USER"],
    password: MainConfig["NODE_DB_PASSWORD"],
    port: MainConfig["NODE_DB_PORT"]
};

const DatabaseConnection = new QueryBuilder(settings, 'mysql', 'pool');


module.exports = DatabaseConnection;