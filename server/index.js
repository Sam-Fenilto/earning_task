const express = require("express"); //main frame
const bodyParser = require('body-parser');
require("dotenv").config();

// includes
const MainConfig = require('./config/Main.config');
const DatabaseConnection = require('./config/Database.config');
const MainRoute = require('./route/Main.route');

// init express app
const app = express();


// middlewares
app.use(express.json());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

//  app routes
app.use("/api/v1", MainRoute);

// entry point
async function main() {
    try {
        app.listen(MainConfig["PORT"], () => console.log(`Server listening on port ${MainConfig["PORT"]}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    } 
}

// entry here
main();