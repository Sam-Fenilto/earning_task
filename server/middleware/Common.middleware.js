class CommonMiddleware {
    await_handler = (middleware) => {
        return async (req, res, next) => {
            try {
                await middleware(req, res, next);
            } catch (err) {
                next(err);
            }
        }
    }
}



module.exports = new CommonMiddleware();