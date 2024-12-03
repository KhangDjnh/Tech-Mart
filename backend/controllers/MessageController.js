const messageService = require('../Services/MessageService');
const imageService = require("../Services/ImageService");

exports.createMessage = async (req, res) => {
    try {
        const { id_conversation, content, id_user, id_shop } = req.body;
        const files = req.files;
        let uploadedImages = [];
        if (files && files.length > 0) {
            for (const file of files) {
               console.log(file.path); // TODO: Remove, for debug only
               uploadedImages.push(file.path); // Lưu thông tin các ảnh đã upload
            }
        }
        
        const newMessage = await messageService.createMessage({ id_conversation, content, id_user, id_shop, messImages: uploadedImages });
        
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
        // Xử lý upload ảnh
        let uploadedImages = [];
        if (files && files.length > 0) {
            for (const file of files) {
               console.log(file.path); // TODO: Remove, for debug only
               uploadedImages.push(file.path); // Lưu thông tin các ảnh đã upload
            }
        }

        const updatedMessage = await messageService.updateMessage(req.params.id, { id_conversation, content, id_user, id_shop, messImages: uploadedImages });
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

        // Delete images from storage
        if (message.images && message.images.length > 0) {
            await Promise.all(message.images.map(async (image) => {
                await imageService.deleteImage(image.public_id);  // Assuming images store `public_id`
            }));
        }

        const deletedMessage = await messageService.deleteMessage(req.params.id);
        res.status(200).json({ data: deletedMessage, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
