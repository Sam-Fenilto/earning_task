const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const DatabaseConnection = require('../config/Database.config');
const MainConfig = require('../config/Main.config')
const { send_res } = require('../util/Common.util');
const { generate_otp, sms_otp_to_user } = require('../util/Otp.util')

class UserModel {
    sign_up = async (req) => {
        const { phone_number, password } = req.body;
        try {
            // check if mobile number exists
            let [user_data, ...rest] = await DatabaseConnection.query("select uuid from et_user_tbl where phone_number = ?", [phone_number]);
            if(user_data.length) {
                return send_res(false, `User Already Exist`, null);
            }

            let uuid = uuidv4(),
                encryt_password = bcrypt.hashSync(password, parseInt(MainConfig["NODE_HASH_ROUND"])),
                user_otp = generate_otp(6);
            let insert_data = [uuid, phone_number, encryt_password, user_otp];
            let [rows, fields] = await DatabaseConnection.query("insert into et_user_tbl(uuid, phone_number, password, otp) values (?, ?, ?, ?)", insert_data)
            if (rows?.affectedRows > 0) { // checking if the data inserted is successful
                // if production buy service
                // await sms_otp_to_user(
                //     {
                //         message: `Your OTP is ${user_otp}`,
                //         contactNumber: phone_number,
                //     },
                // );
                return send_res(true, `Please Verify account with the Otp ${user_otp} for the mobile number ${phone_number}`, [{
                    otp: user_otp,
                    phone_number: phone_number
                }]);
            }else {
                return send_res(false, "User Registered Failed!", null)
            }
        } catch (err) {
            console.log(err)
        } 
    }
}

module.exports = new UserModel();