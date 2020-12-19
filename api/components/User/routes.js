const express = require('express');
const router = express.Router();
const userController = require('./controller')
const {destroySession} = require('../../services/sessions')
const {validatePostError} = require('../../middlewares')
const {
    validateContentDataUser, validateExistsUser,
    validateLoginUser, validateSessionUser
} = require('../../middlewares/validateUser');
router.get('/authme',userController.authMe)
router.post('/', validateContentDataUser(), validatePostError, validateExistsUser, userController.postUser);
router.post('/login',validateLoginUser, userController.loginUser);
router.post('/logout',destroySession);

module.exports = router;