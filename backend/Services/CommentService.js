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
  return comment || null; // Trả về null nếu không tìm thấy
};

exports.updateComment = async (id, comment) => {
  const updatedComment = await Comment.findByIdAndUpdate(id, comment, { new: true });
  return updatedComment || null; // Trả về null nếu không tìm thấy
};

exports.deleteComment = async (id) => {
  const deletedComment = await Comment.findByIdAndDelete(id);
  return deletedComment || null; // Trả về null nếu không tìm thấy
};
