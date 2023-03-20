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
}


module.exports = new ValidatorMiddleware;