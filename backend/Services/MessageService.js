const Message = require('../models/message');

exports.createMessage = async (messageData) => {
    const { id_conversation, content, id_user, id_shop, messImages } = messageData;
    
    const newMessage = new Message({
        id_conversation,
        content,
        id_user,
        id_shop,
        messImages: images || []  // Store image URLs or identifiers
    });
    
    return await newMessage.save();
};

exports.getMessageById = async (id) => {
    return await Message.findById(id)
        .populate('id_conversation')
        .populate('id_user')
        .populate('id_shop');
};

exports.getAllMessages = async () => {
    return await Message.find()
        .populate('id_conversation')
        .populate('id_user')
        .populate('id_shop');
};

exports.updateMessage = async (id, data) => {
    return await Message.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteMessage = async (id) => {
    return await Message.findByIdAndDelete(id);
};
