import Axios from 'axios';

const userServices = {}
userServices.postUser = async (user) => {
    try {
        return await Axios.post('http://localhost:4042/api/users', user, {
            withCredentials: true
        }).catch((err) => {
            return err.response
        })
    } catch (e) {
        return e;
    }
}
userServices.authMe = async () => {
    try {
        return await Axios.get('http://localhost:4042/api/users/authme', {
            withCredentials: true
        }).catch((err) => {
            return err.response
        })
    } catch (e) {
        return e;
    }
}
userServices.logout = async () => {
    try {
        return await Axios.post('http://localhost:4042/api/users/logout', {}, {
            withCredentials: true
        }).catch((err) => {
            return err.response
        })
    } catch (e) {
        return e;
    }
}
userServices.login = async (user) => {
    try {
        return await Axios.post('http://localhost:4042/api/users/login', user, {
            withCredentials: true
        }).catch((err) => {
            return err.response
        })
    } catch (e) {
        return e;
    }
}
export {userServices}