const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const DatabaseConnection = require('../config/Database.config');
const MainConfig = require('../config/Main.config')
const { send_res } = require('../util/Common.util');
const { generate_otp, sms_otp_to_user } = require('../util/Otp.util')

class UserModel {
    is_user_mobile_number_exist = async (phone_number) => {
        try {
            let [user_data, ...rest] = await DatabaseConnection.query("select uuid, otp, phone_number, is_verified from et_user_tbl where phone_number = ?", [phone_number]);
            if (user_data.length) {
                return [true, user_data];
            } else {
                return [false, null];
            }
        } catch (err) {
            console.log(err)
        }
    }


    sign_up = async (req) => {
        const { phone_number, password } = req.body;
        try {
            // check if mobile number exists
            // let [is_user_exist, data] = await this.is_user_mobile_number_exist(phone_number)
            // if (is_user_exist) {
            //     return send_res(false, `User Already Exist`, null);
            // }

            let uuid = uuidv4(),
                encryt_password = bcrypt.hashSync(password, parseInt(MainConfig["NODE_HASH_ROUND"])),
                user_otp = generate_otp(6);
            let insert_data = [uuid, phone_number, encryt_password, user_otp];
            let [rows, fields] = await DatabaseConnection.query("insert into et_user_tbl(uuid, phone_number, password, otp) values (?, ?, ?, ?)", insert_data)
            if (rows?.affectedRows) { // checking if the data inserted is successful
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
            } else {
                return send_res(false, "User Registered Failed!", null)
            }
        } catch (err) {
            return send_res(false, `Server Error!`, null);
        }
    }



    verify_user_otp = async (req) => {
        const { phone_number, otp } = req.body;
        try {
            let [is_user_exist, data] = await this.is_user_mobile_number_exist(phone_number)
            if (!is_user_exist) {
                return send_res(false, `Mobile Number cannot be found`, null);
            }

            let db_current_otp = data[0]?.otp;
            if (parseInt(db_current_otp) === parseInt(otp)) {
                let [rows, fields] = await DatabaseConnection.query("update et_user_tbl set is_verified = ? where phone_number = ?", ['Y', phone_number])
                if (rows.affectedRows) {
                    return send_res(true, `Mobile Number Verified Successfully!`, null);
                } else {
                    return send_res(false, `Verification Failed!`, null);
                }
            } else {
                return send_res(false, `Please enter a valid otp!`, null);
            }
        } catch (err) {
            return send_res(false, `Server Error!`, null);
        }
    }


    generate_new_otp = async (req) => {
        const { phone_number } = req.body;
        try {
            let [is_user_exist, data] = await this.is_user_mobile_number_exist(phone_number)
            if (!is_user_exist) {
                return send_res(false, `Mobile Number cannot be found`, null);
            }
            let user_otp = await generate_otp(6);
            let [rows, fields] = await DatabaseConnection.query("update et_user_tbl set otp = ? where phone_number = ?", [user_otp, phone_number])
            if (rows?.affectedRows) { // checking if the data inserted is successful
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
            }
        } catch (err) {
            return send_res(false, `Server Error!`, null);
        }
    }
}

module.exports = new UserModel();