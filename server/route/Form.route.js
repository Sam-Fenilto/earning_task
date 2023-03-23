const express = require('express');
const router = express.Router();

// includes
const FormController = require('../controller/Form.controller');
const ValidatorMiddleware = require('../middleware/Validator.middleware');

router.post('/create_form',  FormController.create_form);
router.get('/form_list',  FormController.form_list);
router.delete('/delete_form',  FormController.delete_form);
router.get('/get_form',  FormController.get_form);

module.exports = router;