// Import mongoose
const mongoose = require('mongoose');
const { model, Schema } = mongoose;

// Schema Model for Cart Item
const cartItemSchema = Schema({

    name: {
        type: String,
        minLength: [3, 'Panjang nama cart item minimal 3 karakter'],
        required: [true, 'Nama cart item harus diisi'],
    },

    qty: {
        type: Number,
        required: [true, 'qty harus diisi'],
        min: [1, 'Minimal qty adalah 1']
    },

    price: {
        type: Number,
        default: 0
    },

    image_url: String,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

// export to controller cart
module.exports = model('CartItem', cartItemSchema);