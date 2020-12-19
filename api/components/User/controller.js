const UserDto = require('./dto');
const UserModel = require('./dao');
const bcrypt = require('bcryptjs')
const {createSessionUser} = require("../../services/sessions");
const BCRYPT_SALT_ROUNDS = 12;
module.exports = {
    async postUser(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
            const user = await UserModel.postUser({
                name: req.body.name,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password
            })
            const returnUser = UserDto.single(user, req.session.data);
            createSessionUser(req, res, returnUser);
            return res.status(200).json(returnUser);
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'No se ha podido registrar el usuario, verifica tus datos.'
            })
        }
    },
    async authMe(req, res) {
        return res.status(200).json(req.session.data);
    },
    async loginUser(req,res){
        const userName = req.body.username;
        const user = await UserModel.findUserByUserName(userName);
        const returnUser = UserDto.single(user);
        createSessionUser(req, res, returnUser);
        return res.status(200).json(returnUser);
    }
}