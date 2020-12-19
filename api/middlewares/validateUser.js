const {findUserByUserName} = require('../components/User/dao')
const {body} = require("express-validator");
const bcrypt = require('bcryptjs')
module.exports.validateContentDataUser = () => {
    return [
        body("name").isString().withMessage("Ingrese un nombre valido"),
        body("lastname").isString().withMessage("Ingrese un apellido valido"),
        body("username").isString().withMessage("Usuario Invalido"),
        body("password").isLength({min: 5}).withMessage("Contraseña invalida Invalido"),
    ];
};
module.exports.validateExistsUser = async (req, res, next) => {
    if (await findUserByUserName(req.body.username))
        return res.status(409).json({
            message: "Ya hay un usuario registrado con este Usuario",
        });
    next();
};
module.exports.validateSessionUser = async (req, res, next) => {
    if (!req.session.data) {
        return res.status(401).json({
            status: "Error",
            message: "Unauthorized",
        });
    }
    next();
};
module.exports.validateLoginUser = async (req, res, next) => {
    const user = await findUserByUserName(req.body.username)
    if (!user) {
        return res.status(409).json({
            message: 'Esta usuario no esta registrado.'
        })
    }
    const matchPassword = await bcrypt.compare(req.body.password,user.password);
    if (!matchPassword) {
        return res.status(409).json({
            message: 'La contraseña no coincide, por favor verifica tus datos.'
        })
    }
    next();
}