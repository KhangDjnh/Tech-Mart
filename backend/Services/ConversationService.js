const Conversation = require('../models/conversation');

exports.createConversation = async (data) => {
  const conversation = new Conversation(data);
  return await conversation.save();
};

exports.getConversationById = async (id) => {
  return await Conversation.findById(id).populate('id_user').populate('id_shop');
};

exports.getAllConversations = async () => {
  return await Conversation.find().populate('id_user').populate('id_shop');
};

exports.deleteConversation = async (id) => {
  return await Conversation.findByIdAndDelete(id);
};
