const messageService = require('../Services/MessageService');
const imageService = require("../services/ImageService");

exports.createMessage = async (req, res) => {
    try {
        const { id_conversation, content, id_user, id_shop } = req.body;
        let images = req.body.images || [];

        if (images.length > 0) {
            images = await Promise.all(images.map(async (image) => {
                const uploadedImage = await imageService.uploadImage(image, "TechMarket-Message");
                if (!uploadedImage) throw new Error("Failed to upload image.");
                return uploadedImage;  // Collect the uploaded image URLs
            }));
        }
        
        const newMessage = await messageService.createMessage({ id_conversation, content, id_user, id_shop, images });
        
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
        const { images } = req.body;
        let updatedImages = images || [];

        const message = await messageService.getMessageById(req.params.id);

        if (!message) return res.status(404).json({ error: "Message not found" });

        // Update images: upload new ones, keep existing ones, delete removed ones
        if (updatedImages.length > 0) {
            const newImages = await Promise.all(updatedImages.map(async (image) => {
                const uploadedImage = await imageService.uploadImage(image, "TechMarket-Message");
                if (!uploadedImage) throw new Error("Failed to upload image.");
                return uploadedImage;
            }));

            updatedImages = [...message.images, ...newImages]; // Combine old and new images
        }

        const updatedMessage = await messageService.updateMessage(req.params.id, { ...req.body, images: updatedImages });
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
