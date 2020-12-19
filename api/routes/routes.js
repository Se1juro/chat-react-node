const express = require("express");
const router = express.Router();
const users = require('../components/User/routes');
const messages = require('../components/messages/routes');
router.use('/users', users);
router.use('/messages', messages);
module.exports = router;
