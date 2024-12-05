const messageService = require('../Services/MessageService');
const imageService = require("../Services/ImageService");

exports.createMessage = async (req, res) => {
    try {
        const { id_conversation, content, sender, receiver } = req.body;
        const files = req.files;
        let uploadedImages = [];

        if (files && files.length > 0) {
            for (const file of files) {
                console.log(file.path); 
                uploadedImages.push(file.path);
            }
        }

        const newMessage = await messageService.createMessage({
            id_conversation,
            content,
            sender,
            receiver,
            messImages: uploadedImages
        });
        await messageService.updateLatestMessage(id_conversation, newMessage._id);
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
        const message = await messageService.getMessageById(req.params.id);

        if (!message) return res.status(404).json({ error: "Message not found" });

        const files = req.files;
        let uploadedImages = [];
        if (files && files.length > 0) {
            for (const file of files) {
                console.log(file.path); 
                uploadedImages.push(file.path); 
            }
        }

        const updatedMessage = await messageService.updateMessage(req.params.id, {
            content: req.body.content,
            messImages: uploadedImages
        });

        res.status(200).json({ data: updatedMessage, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const message = await messageService.getMessageById(req.params.id);

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        if (message.messImages && message.messImages.length > 0) {
            await Promise.all(message.messImages.map(async (image) => {
                await imageService.deleteImage(image);  // Giả sử `imageService.deleteImage` sẽ xóa ảnh
            }));
        }

        const deletedMessage = await messageService.deleteMessage(req.params.id);
        res.status(200).json({ data: deletedMessage, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessagesByConversation = async (req, res) => {
    try {
      const { id_conversation } = req.params;
      const messages = await messageService.getMessagesByConversation(id_conversation);
      res.status(200).json({ data: messages, status: 'success' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };