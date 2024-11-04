const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
}, { timestamps: true });

module.exports = mongoose.model('tag', TagSchema);
