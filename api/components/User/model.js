const UserDao = require('./dao');
module.exports = {
    async postUser(user) {
        return UserDao.postUser(user);
    }
}