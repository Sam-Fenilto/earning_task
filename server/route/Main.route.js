const express = require('express');
const router = express.Router();
const {send_res} = require('../util/Common.util')


const UserRoute = require('./User.route')

// index route
router.get("/", (req, res) => {
  res.status(200).json(send_res(true, "server is up and running", null));
});


router.use('/user', UserRoute);

module.exports = router;