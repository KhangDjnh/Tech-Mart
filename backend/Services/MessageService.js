const Message = require('../models/message');

exports.createMessage = async (data) => {
    const message = new Message(data);
    return await message.save();
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
