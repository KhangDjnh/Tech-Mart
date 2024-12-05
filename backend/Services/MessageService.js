const Message = require('../models/message');
const Conversation = require('../models/conversation');

exports.createMessage = async (messageData) => {
    const { id_conversation, content, sender, receiver, messImages } = messageData;

    if (!content && (!messImages || messImages.length === 0)) {
        throw new Error('A message must have either content or images.');
    }

    const newMessage = new Message({
        id_conversation,
        content,
        sender,
        receiver,
        messImages: messImages || []  
    });

    return await newMessage.save();
};

exports.getMessageById = async (id) => {
    return await Message.findById(id)
        .populate('id_conversation')
        .populate('sender')
        .populate('receiver');
};

exports.getAllMessages = async () => {
    return await Message.find()
        .populate('id_conversation')
        .populate('sender')
        .populate('receiver');
};

exports.updateMessage = async (id, data) => {
    return await Message.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteMessage = async (id) => {
    return await Message.findByIdAndDelete(id);
};

exports.getMessagesByConversation = async (conversationId) => {
    try {
      return await Message.find({ id_conversation: conversationId })
    } catch (err) {
      throw new Error("Error retrieving messages: " + err.message);
    }
  };

  exports.updateLatestMessage = async (conversationId, messageId) => {
    try {
      // Cập nhật tin nhắn mới nhất trong Conversation
      return await Conversation.findByIdAndUpdate(
        conversationId,
        { lastMessage: messageId },  // Cập nhật lastMessage trong Conversation
        { new: true }  // Trả về đối tượng đã được cập nhật
      );
    } catch (err) {
      throw new Error("Error updating latest message: " + err.message);
    }
}