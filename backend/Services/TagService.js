const Tag = require("../models/tag.js");

exports.createTag = async (tag) => {
  const { name } = tag;

  const newTag = new Tag({ name });

  return await newTag.save();
};

exports.getAllTags = async () => {
  return await Tag.find();
};

exports.getTagById = async (id) => {
  const tag = await Tag.findById(id);
  return tag;
};

exports.updateTag = async (id, tag) => {
  const updatedTag = await Tag.findByIdAndUpdate(id, tag, { new: true });
  return updatedTag;
};

exports.deleteTag = async (id) => {
  const deletedTag = await Tag.findByIdAndDelete(id);
  return deletedTag;
};
