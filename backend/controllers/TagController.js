const tagService = require("../Services/TagService");

exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = await tagService.createTag({ name });
        res.status(201).json({ data: newTag, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllTags = async (req, res) => {
    try {
        const tags = await tagService.getAllTags();
        res.status(200).json({ data: tags, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTagById = async (req, res) => {
    try {
        const tag = await tagService.getTagById(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.status(200).json({ data: tag, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const tag = await tagService.getTagById(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }

        const updatedTag = await tagService.updateTag(req.params.id, { name });

        res.status(200).json({ data: updatedTag, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const tag = await tagService.getTagById(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }

        const deletedTag = await tagService.deleteTag(req.params.id);

        res.status(200).json({ data: deletedTag, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};