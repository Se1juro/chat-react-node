const MessageDto = require('./dto');
const MessageModel = require('./model');
module.exports = {
    async getMessage(req, res) {
        try {
            const messages = await MessageModel.getMessages();
            return res.status(200).json(MessageDto.multiple(messages[0].messages));
        } catch (e) {
            return res.status(500).json({message: 'No se pudo obtener el registro de los mensajes'})
        }
    },
}