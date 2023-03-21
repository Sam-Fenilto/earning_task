const express = require("express"); //main frame
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();

// includes
const MainConfig = require('./config/Main.config');
const DatabaseConnection = require('./config/Database.config');
const MainRoute = require('./route/Main.route');

// init express app
const app = express();
const corsOptions = {
    origin: ['http://localhost:4000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Cache-Control'],
    credentials: true,
}

// middlewares
app.use(cors(corsOptions));
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