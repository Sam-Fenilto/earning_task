const express = require('express');
const router = express.Router();
const {send_res} = require('../util/Common.util')


const UserRoute = require('./User.route');
const FormRoute = require('./Form.route');

// index route
router.get("/", (req, res) => {
  res.status(200).json(send_res(true, "server is up and running", null));
});


router.use('/user', UserRoute);
router.use('/form', FormRoute);

module.exports = router;