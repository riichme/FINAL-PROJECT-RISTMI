// Import all needed dependencies
const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Invoice = require('../invoice/model');

// Schema Model for Order
const orderSchema = Schema({
    
    status: {
        type: String,
        enum: ['waiting_payment', 'processing', 'in_delivery', 'delivered'],
        default: 'waiting_payment'
    },

    delivery_fee: {
        type: Number,
        default: 0,
    },

    delivery_address: {
        provinsi: {type: String, required: [true, 'provinsi harus diisi']},
        kabupaten: {type: String, required: [true, 'kabupaten harus diisi']},
        kecamatan: {type: String, required: [true, 'kecamatan harus diisi']},
        kelurahan: {type: String, required: [true, 'kelurahan harus diisi']},
        detail: {type: String}
    },

    user: { // relate to logged user
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    // relate to order items
    // all order items will be one list
    order_items: [{type: Schema.Types.ObjectId, ref: 'OrderItem'}] 

}, {timestamps: true}); // add createdAt and updatedAt

// handle auto increment of order number
orderSchema.plugin(AutoIncrement, {inc_field: 'order_number'});
// handle total of order items
orderSchema.virtual('items_count').get(function(){
    return this.order_items.reduce((total, item) => total + parseInt(item.qty), 0);
});
// handle creating invoice automatically after order created
orderSchema.post('save', async function(){
    let subtotal = this.order_items.reduce((total, item) => total += (item.price * item.qty), 0);
    let invoice = new Invoice({
        user: this.user,
        order: this._id,
        subtotal,
        delivery_fee: parseInt(this.delivery_fee),
        total: parseInt(subtotal + this.delivery_fee),
        delivery_address: this.delivery_address
    });
    await invoice.save();
});

// export to order controller
module.exports = model('Order', orderSchema);

