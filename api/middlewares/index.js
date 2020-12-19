const createError = require("http-errors");
const {validationResult} = require("express-validator");

module.exports.error404Handler = (req, res, next) => {
    next(createError(404, "Not Found"));
};

module.exports.errorHandler = function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
};
module.exports.validatePostError = (req, res, next) => {
    const errors = validationResult(req);
    const errorsToFront = [];
    if (!errors.isEmpty()) {
        errors.array().map((err) => errorsToFront.push({[err.param]: err.msg}));
        return res.status(400).json({
            errors: errorsToFront,
        });
    }
    next();
}