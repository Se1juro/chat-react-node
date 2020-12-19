const MessagesSchema = require('./schema');
module.exports = {
    async postMessage(message, user, role) {
        return new Promise((resolve, reject) => {
            console.log(message, user, role)
            MessagesSchema.updateOne({}, {
                $push: {
                    messages: {
                        message,
                        user,
                        role
                    }
                }
            }, {new: true, upsert: true}, (err, doc) => {
                if (err) reject(err);
                return resolve(doc);
            })
        })
    },
    async getMessages() {
        return new Promise((resolve, reject) => {
            MessagesSchema.find().exec((err, res) => {
                if (err) reject(err);
                return resolve(res);
            })
        })
    }
}