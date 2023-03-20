const express = require('express');
const router = express.Router();

// includes
const UserController = require('../controller/User.controller');
const ValidatorMiddleware = require('../middleware/Validator.middleware');

router.post('/sign_up', ValidatorMiddleware.sign_up, UserController.sign_up);

module.exports = router;