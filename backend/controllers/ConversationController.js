const conversationService = require('../Services/ConversationService');

exports.createConversation = async (req, res) => {
  try {
    const { participants, lastMessage } = req.body;

    const newConversation = await conversationService.createConversation({ 
      participants, 
      lastMessage 
    });

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

exports.getConversationsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;  

    const conversations = await conversationService.getConversationsByUserId(userId);

    res.status(200).json({ data: conversations, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};