class CommonUtil {
    send_res = (valid, message, data, logout) => {
        return {
            valid: valid,
            message: message,
            data: data,
            force_logout: logout | false
        }
    }
}

module.exports = new CommonUtil();