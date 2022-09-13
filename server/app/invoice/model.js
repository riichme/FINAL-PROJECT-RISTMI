// Import mongoose
const mongoose = require('mongoose');
const { model, Schema } = mongoose;

// Schema Model for Invoice
const invoiceSchema = Schema({

    subtotal: {
        type: Number,
        required: [true, 'Subtotal harus diisi']
    },

    delivery_fee: {
        type: Number,
        required: [true, 'Delivery_fee harus diisi']
    },

    delivery_address: {
        provinsi: {type: String, required: [true, 'provinsi harus diisi']},
        kabupaten: {type: String, required: [true, 'kabupaten harus diisi']},
        kecamatan: {type: String, required: [true, 'kecamatan harus diisi']},
        kelurahan: {type: String, required: [true, 'kelurahan harus diisi']},
        detail: {type: String}
    },

    total: {
        type: Number,
        required: [true, 'Total harus diisi']
    },

    payment_status: {
        type: String,
        enum: ['waiting_payment', 'paid'],
        default: 'waiting_payment'
    },

    user: { // relate to user
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    order: { // relate to order
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },

}, {timestamps: true}); // add createdAt and updatedAt

// export to invoice controller
module.exports = model('Invoice', invoiceSchema);