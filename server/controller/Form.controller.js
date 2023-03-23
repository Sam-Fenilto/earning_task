const { validationResult } = require('express-validator');

const MainConfig = require('../config/Main.config');
const { send_res } = require('../util/Common.util')
const FormModel = require('../model/Form.model');


class FormController {
    create_form = async (req, res) => {
        try {
            // const valid_error = await validationResult(req);
            // if(valid_error.errors.length) {
            //     res.status(200).json(send_res(false, "Request field error", valid_error));
            //     return false;
            // }

            const result = await FormModel.create_form(req);
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err)
            res.status(500).json(send_res(false, MainConfig['NODE_ERROR_MESSAGE'].server_error, null));
        }
    }

    form_list = async (req, res) => {
        try {
            const result = await FormModel.form_list(req);
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(send_res(false, MainConfig['NODE_ERROR_MESSAGE'].server_error, null));
        }
    }

    delete_form = async (req, res) => {
        try {
            const result = await FormModel.delete_form(req);
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(send_res(false, MainConfig['NODE_ERROR_MESSAGE'].server_error, null));
        }
    }

    get_form = async (req, res) => {
        try {
            const result = await FormModel.get_form(req);
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err)
            res.status(500).json(send_res(false, MainConfig['NODE_ERROR_MESSAGE'].server_error, null));
        }
    }
}


module.exports = new FormController();