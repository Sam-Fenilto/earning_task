const { validationResult  } = require('express-validator');

const DatabaseConnection = require('../config/Database.config');
const MainConfig = require('../config/Main.config');
const {send_res} = require('../util/Common.util')
const UserModel = require('../model/User.model');


class UserController {
    sign_up = async (req, res) => {
        try {

            const valid_error = await validationResult(req);
            if(valid_error.errors.length) {
                res.status(200).json(send_res(false, "Request field error", valid_error));
                return false;
            }
            
            const result = await UserModel.sign_up(req);
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(send_res(false, MainConfig['NODE_ERROR_MESSAGE'].server_error, null));
        }
    }
}


module.exports = new UserController();