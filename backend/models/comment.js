const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    id_user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Tham chiếu đến model User (chủ sở hữu cmt)
        required: true 
    },
    id_product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',  // Tham chiếu đến model Product (sản phẩm của cmt)
        required: true 
    },
    content: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 500  // Giới hạn nội dung bình luận tối đa 500 ký tự
    },
    rating: { 
        type: Number, 
        default: 0,
        min: 0,  // Giá trị tối thiểu của đánh giá là 0
        max: 5   // Giá trị tối đa của đánh giá là 5
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, { timestamps: true }); 

module.exports = mongoose.model('Comment', CommentSchema);
