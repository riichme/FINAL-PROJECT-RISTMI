// Import mongoose
const mongoose = require('mongoose');
const { model, Schema } = mongoose;

// Schema Model for Cart Item
const orderItemSchema = Schema({

    name: {
        type: String,
        minLength: [5, 'Panjang nama order item minimal 5 karakter'],
        required: [true, 'nama order item harus diisi']
    },

    price: {
        type: Number,
        required: [true, 'Harga item harus diisi']
    },

    qty: {
        type: Number,
        required: [true, 'Kuantitas harus diisi'],
        min: [1, 'Kuantitas minimal 1']
    }, 

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

// export to order controller
// it will relate to order model
module.exports = model('OrderItem', orderItemSchema);