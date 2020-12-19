const MessageDao = require('./dao.js');
module.exports = {
    async getMessages() {
        return MessageDao.getMessages();
    },
}