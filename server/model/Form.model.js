const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');
const sharp = require('sharp');
const path = require('path');

const DatabaseConnection = require('../config/Database.config');
const MainConfig = require('../config/Main.config')
const { send_res } = require('../util/Common.util');

class FormModel {
    original_image_path = path.join(__dirname, "../public/original_image")

    create_form = async (req) => {
        let { image_title, image_description, category_id, is_price_avaliable, price, is_terms_accepted, form_uuid } = req.body;
        const { image_data } = req.files;
        try {
            price = is_price_avaliable == 'true' ? price : 0;
            is_price_avaliable = is_price_avaliable == 'true' ? 'Y' : 'N';
            is_terms_accepted = is_terms_accepted == 'true' ? 'Y' : 'N';
            let uuid
            if (form_uuid) {
                uuid = form_uuid;
            } else {
                uuid = uuidv4();
            }
            let original_file_name = image_data.name,
                image_extension = image_data.mimetype.split('/')[1],
                image_display_name = `${uuid}_image.${image_extension}`;


            if (form_uuid) {
                let insert_data = [image_title, image_description, original_file_name, image_extension, category_id, is_price_avaliable, price, is_terms_accepted, uuid];
                var [rows, fields] = await DatabaseConnection.query("update et_form_tbl set image_title = ?, image_description = ?, original_file_name = ?, image_extension = ?, category_id = ?, is_price_available = ?, price = ? , is_terms_accepted =? where uuid = ?", insert_data);
            } else {
                let insert_data = [uuid, image_title, image_description, original_file_name, image_extension, category_id, is_price_avaliable, price, is_terms_accepted];
                var [rows, fields] = await DatabaseConnection.query("insert into et_form_tbl(uuid, image_title, image_description, original_file_name, image_extension, category_id, is_price_available, price, is_terms_accepted) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", insert_data);
            }

            if (rows?.affectedRows) { // checking if the data inserted is successful
                let upload_path = this.original_image_path + `\\${image_display_name}`;
                // original image
                image_data.mv(upload_path, function (err) {
                    if (err) return send_res(false, "Form Created Failed!", null);
                    const sharpInstance = sharp(upload_path);

                    // Thumbnail image (300px width)
                    let thumnail_path = path.join(__dirname, "../public/thumbnail/" + `${uuid}_thumbnail.${image_extension}`)
                    sharpInstance.clone()
                        .resize(300)
                        .toFile(thumnail_path);

                    // Preview image (900px width)
                    let preview_path = path.join(__dirname, "../public/preview/" + `${uuid}_preview.${image_extension}`)
                    sharpInstance.clone()
                        .resize(900)
                        .toFile(preview_path);
                });
                return send_res(true, "Form Created Successfully!", null);
            } else {
                return send_res(false, "Form Created Failed!", null);
            }
        } catch (err) {
            console.log(err);
            return send_res(false, "Server Error!", null);
        }
    }


    form_list = async (req) => {
        let { form_uuid } = req.params;
        try {
            let [rows, fields] = await DatabaseConnection.query("select et_form_tbl.image_title, et_form_tbl.image_description, et_form_tbl.image_extension, et_form_tbl.is_price_available, et_form_tbl.is_terms_accepted, et_form_tbl.price, et_form_tbl.uuid, et_category_tbl.category_name from et_form_tbl LEFT JOIN et_category_tbl on et_form_tbl.category_id = et_category_tbl.id");
                
            return send_res(true, "Form List Fetched Successfully!", rows);

        } catch (err) {
            console.log(err);
            return send_res(false, "Server Error!", null);
        }
    }


    delete_form = async (req) => {
        let { form_uuid } = req.body;
        try {
            let [rows, fields] = await DatabaseConnection.query("delete from et_form_tbl where uuid = ?", [form_uuid]);
            return send_res(true, "Form List Deleted Successfully!", rows);
        } catch (err) {
            console.log(err);
            return send_res(false, "Server Error!", null);
        }
    }

    get_form = async (req) => {
        let { form_uuid } = req.query;
        try {
            let [rows, fields] = await DatabaseConnection.query("select et_form_tbl.image_title, et_form_tbl.image_description, et_form_tbl.image_extension, et_form_tbl.is_price_available, et_form_tbl.is_terms_accepted, et_form_tbl.price, et_form_tbl.uuid,  et_form_tbl.category_id, et_form_tbl.original_file_name from et_form_tbl where uuid = ?", [form_uuid]);
            var bitmap = await  fs.readFile(this.original_image_path + `\\${rows[0].uuid}_image.${rows[0].image_extension}`, {encoding: 'base64'});
                let buffer_data =  bitmap.toString('base64');
            rows[0]['image_base'] = buffer_data;
            return send_res(true, "Form Fetched Successfully!", rows);
        } catch (err) {
            console.log(err);
            return send_res(false, "Server Error!", null);
        }
    }
}

module.exports = new FormModel();