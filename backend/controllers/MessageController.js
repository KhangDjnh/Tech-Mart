const messageService = require('../Services/MessageService');

exports.createMessage = async (req, res) => {
    try {
        const { id_conversation, content, id_user, id_shop } = req.body;
        
        const newMessage = await messageService.createMessage({ id_conversation, content, id_user, id_shop });
        
        res.status(201).json({ data: newMessage, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await messageService.getMessageById(req.params.id);
        res.status(200).json({ data: message, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await messageService.getAllMessages();
        res.status(200).json({ data: messages, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const updatedMessage = await messageService.updateMessage(req.params.id, req.body);
        res.status(200).json({ data: updatedMessage, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await messageService.deleteMessage(req.params.id);
        res.status(200).json({ data: deletedMessage, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
