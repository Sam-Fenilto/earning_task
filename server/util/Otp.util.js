const fast2sms = require("fast-two-sms");
const { FAST2SMS } = require("../config");


class OtpUtil {
    generate_otp = (otp_length) => {
        let digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < otp_length; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    sms_otp_to_user = async ({ message, contactNumber }, next) => {
        try {
            const res = await fast2sms.sendMessage({
                authorization: FAST2SMS,
                message,
                numbers: [contactNumber],
            });
            console.log(res);
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new OtpUtil();