module.exports.createSessionUser = (req, res, data) => {
    req.session.data = data;
};
module.exports.destroySession = (req, res) => {
    req.session.destroy((err) => {
        req.session = null;
        if (err) console.log(err);
        return res
            .clearCookie(process.env.SECRETTOKEN, { path: "/" })
            .status(200)
            .send("Ok.");
    });
};
