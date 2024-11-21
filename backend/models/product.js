const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id_tag: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tag', 
        required: true 
    },
    id_shop: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop', 
        required: true 
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    stock: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    image: { 
        type: String 
    },
    rating: { 
        type: Number, 
        min: 0, 
        max: 5, 
        default: 0 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
