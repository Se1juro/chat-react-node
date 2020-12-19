import Axios from 'axios'

const messageServices = {};
messageServices.getMessages = async () => {
    try {
        return await Axios.get('http://localhost:4042/api/messages/', {
            withCredentials: true
        })
    } catch (e) {
        return e;
    }
}
export {messageServices}