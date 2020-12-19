const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {
    validateSessionUser
} = require('../../middlewares/validateUser');
router.get('/', validateSessionUser, controller.getMessage);

module.exports = router;