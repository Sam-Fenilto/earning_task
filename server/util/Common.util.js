const fs = require('fs-extra')

class CommonUtil {
    send_res = (valid, message, data, logout) => {
        return {
            valid: valid,
            message: message,
            data: data,
            force_logout: logout | false
        }
    }

    write_base64_to_file = async (image_base, file_path) => {
        const [mimeType, base64] = image_base.split(',');
        const buffer = Buffer.from(base64, 'base64');
        await fs.writeFile(file_path, buffer);
    }
}

module.exports = new CommonUtil();