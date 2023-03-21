const { body, check } = require('express-validator');

class ValidatorMiddleware {
	sign_up = [
		check('phone_number')
			.not().isEmpty().bail().withMessage('Mobile number required!'),
		check('password')
			.not().isEmpty().bail().withMessage('Password required!')
			.isLength({
				min: 6
			}).bail().withMessage('password is too short!')
			.isLength({
				max: 50
			}).bail().withMessage('password is too large!')
	]


	verify_user_otp = [
		check('phone_number')
		.not().isEmpty().bail().withMessage('Mobile number required!'),
		check('otp')
		.not().isEmpty().bail().withMessage('Otp required!'),
	]

	generate_new_otp = [
		check('phone_number')
		.not().isEmpty().bail().withMessage('Mobile number required!'),
	]
}


module.exports = new ValidatorMiddleware;