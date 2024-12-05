const Comment = require("../models/comment.js");

exports.createComment = async (comment) => {
  const { 
    id_user,
    id_product,
    content,
    rating,
  } = comment;

  const newComment = new Comment({
    id_user,
    id_product,
    content,
    rating,
  });

  return await newComment.save();
};

exports.getAllComments = async () => {
  return await Comment.find();
};

exports.getCommentById = async (id) => {
  const comment = await Comment.findById(id);
  return comment;
};

exports.updateComment = async (id, comment) => {
  const updatedComment = await Comment.findByIdAndUpdate(id, comment, { new: true });
  return updatedComment;
};

exports.deleteComment = async (id) => {
  const deletedComment = await Comment.findByIdAndDelete(id);
  return deletedComment;
};

exports.getCommentsByProductId = async (id_product) => {
  try {
      const comments = await Comment.find({ id_product: id_product }); 
      return comments;
  } catch (err) {
      throw new Error("Không thể lấy comment: " + err.message);
  }
};