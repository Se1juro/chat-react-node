const UserSchema = require('./schema');

module.exports = {
    async postUser(user) {
        return new Promise((resolve, reject) => {
            const newUser = new UserSchema(user);
            newUser.save((err, doc) => {
                if (err) reject(err);
                return resolve(doc);
            })
        })
    },
    async findUserByUserName(username) {
        return new Promise((resolve, reject) => {
            UserSchema.findOne({username}).exec((err, doc) => {
                if (err) reject(err);
                return resolve(doc);
            })
        })
    }
}