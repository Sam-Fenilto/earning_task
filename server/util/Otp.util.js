const fast2sms = require("fast-two-sms");
const MainConfig = require("../config/Main.config");


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
                authorization: MainConfig["NODE_API_KEY"],
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