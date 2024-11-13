const commentService = require("../Services/CommentService");

exports.createComment = async (req, res) => {
    try {
        const { id_user, id_product, content, rating } = req.body;
        const newComment = await commentService.createComment({ id_user, id_product, content, rating });
        res.status(201).json({ data: newComment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json({ data: comments, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await commentService.getCommentById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ data: comment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { id_user, id_product, content, rating } = req.body;

        const comment = await commentService.getCommentById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const updatedComment = await commentService.updateComment(req.params.id, { id_user, id_product, content, rating });
        res.status(200).json({ data: updatedComment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await commentService.getCommentById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const deletedComment = await commentService.deleteComment(req.params.id);
        res.status(200).json({ data: deletedComment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
