const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const DatabaseConnection = require('../config/Database.config');
const MainConfig = require('../config/Main.config')
const { send_res } = require('../util/Common.util');

class UserModel {
    sign_up = async (req) => {
        const { phone_number, password } = req.body;
        try {
            
            let uuid = uuidv4();
            
            let encryt_password = bcrypt.hashSync(password, parseInt(MainConfig["NODE_HASH_ROUND"]));
            console.log(encryt_password)
            let insert_data = {
                uuid: uuid,
                phone_number: phone_number,
                password: encryt_password,
            }
            const con = await DatabaseConnection.get_connection();
            console.log(con)
            let insert_id = con.insert('ec_user_tbl', insert_data);
            return send_res(true, "User Registered Successfully", null)
        } catch (err) {
            console.log(err)
        } finally {
            DatabaseConnection.release();
        }
    }
}

module.exports = new UserModel();