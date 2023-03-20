let MainConfig = {
    NODE_ENV: process.env.NODE_ENV,
}

switch (MainConfig["NODE_ENV"]) {
    case "DEVELOPMENT":
        MainConfig["PORT"] = process.env.PORT
        MainConfig["NODE_DB_HOST"] = process.env.NODE_DB_HOST
        MainConfig["NODE_DB_DATABASE"] = process.env.NODE_DB_DATABASE
        MainConfig["NODE_DB_USER"] = process.env.NODE_DB_USER
        MainConfig["NODE_DB_PASSWORD"] = process.env.NODE_DB_PASSWORD
        MainConfig["NODE_DB_PORT"] = process.env.NODE_DB_PORT
        MainConfig["NODE_API_KEY"] = process.env.NODE_API_KEY
        MainConfig["NODE_ERROR_MESSAGE"] = {
            server_error: "Internal Server Error!"
        }
        MainConfig["NODE_HASH_ROUNDS"] = process.env.NODE_HASH_ROUNDS
        break;
    default:
        MainConfig["PORT"] = process.env.PORT
}


module.exports = MainConfig;