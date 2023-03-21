const express = require('express');
const router = express.Router();

// includes
const UserController = require('../controller/User.controller');
const ValidatorMiddleware = require('../middleware/Validator.middleware');

router.post('/sign_up', ValidatorMiddleware.sign_up, UserController.sign_up);
router.post('/verify_user_otp', ValidatorMiddleware.verify_user_otp, UserController.verify_user_otp);
router.post('/generate_new_otp', ValidatorMiddleware.generate_new_otp, UserController.generate_new_otp);

module.exports = router;