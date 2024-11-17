const conversationService = require('../Services/ConversationService');

exports.createConversation = async (req, res) => {
  try {
    const { id_user, id_shop } = req.body;
    const newConversation = await conversationService.createConversation({ id_user, id_shop });
    res.status(201).json({ data: newConversation, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const conversation = await conversationService.getConversationById(req.params.id);
    res.status(200).json({ data: conversation, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const conversations = await conversationService.getAllConversations();
    res.status(200).json({ data: conversations, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const deletedConversation = await conversationService.deleteConversation(req.params.id);
    res.status(200).json({ data: deletedConversation, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
