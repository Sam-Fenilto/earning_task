
class CommonUtil {
    // check image has 1000px
    is_image_1000px = (image_data) => {
        var img = new Image();
        img.src = window.URL.createObjectURL(image_data);
        img.onload = function () {
            var width = img.naturalWidth,
                height = img.naturalHeight;

            window.URL.revokeObjectURL(image_data.src);
            if (width >= 1000) {
                return true;
            }
            else {
                return false;
            }
        };
    }

}

export default new CommonUtil;