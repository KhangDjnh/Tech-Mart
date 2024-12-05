const Conversation = require('../models/conversation');

exports.createConversation = async (data) => {
  const { participants, lastMessage } = data;

  if (participants.length < 2) {
    throw new Error('A conversation must have at least two participants.');
  }

  const conversation = new Conversation({
    participants,
    lastMessage
  });

  return await conversation.save();
};

exports.getConversationById = async (id) => {
  return await Conversation.findById(id)
    .populate('participants')  
    .populate('lastMessage');  
};

exports.getAllConversations = async () => {
  return await Conversation.find()
    .populate('participants')
    .populate('lastMessage');
};

exports.deleteConversation = async (id) => {
  return await Conversation.findByIdAndDelete(id);
};

exports.getConversationsByUserId = async (userId) => {
  return await Conversation.find({
    participants: userId  // Lọc các cuộc trò chuyện có người dùng tham gia
  })
  .populate('participants')
  .populate('lastMessage');
};
