// Import all needed dependencies
// There are 4 needed models
const CartItem = require('../cart-item/model');
const DeliveryAddress = require('../deliveryAddress/model');
const Order = require('../order/model');
const OrderItem = require('../order-item/model');
const { Types } = require('mongoose');

// handle creating order
const store = async (req, res, next) => {
    try {
        // Request bodies are just delivery fee and delivery address
        let {delivery_fee, delivery_address} = req.body;
        // Find all cart items by id from logged user include product data
        let items = await CartItem.find({user: req.user._id}).populate('product');
        // If no items available
        if(!items){
            return res.json({
                error: 1,
                message: `You're not create order because you have not items in cart`
            });
        }
        //  Find address by id of delivery address from active user
        let address = await DeliveryAddress.findById(delivery_address);
        // Creating order payload
        let order = new Order({
            _id: new Types.ObjectId(),
            status: 'waiting_payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                provinsi: address.provinsi,
                kabupaten: address.kabupaten,
                kecamatan: address.kecamatan,
                kelurahan: address.kelurahan,
                detail: address.detail,
            },
            user: req.user._id,
        });
        // Creating order items payload and will result list of order item
        let orderItems = await OrderItem.insertMany(items.map(item => ({
            ...item,
            name: item.product.name,
            qty: parseInt(item.qty),
            price: parseInt(item.product.price),
            order: order._id,
            product: item.product._id
        })));
        // Each chosen item will be pushed to order items
        orderItems.forEach(item => order.order_items.push(item));
        order.save();

        // if order is already created, delete cart item by user id
        await CartItem.deleteMany({user: req.user._id});

        // return response of order as JSON
        return res.json(order);
    } catch (err) { // If error exists
        if(err && err.name === 'ValidationError'){ // If there's error about Validation
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            })
        }

        // continue error to app.js
        next(err)
    }
}

// handle get all order
const index = async (req, res, next) => {
    try {
        //  skip and limit query will be used for pagination in frontend
        let {skip = 0, limit = 10} = req.query;

        // handle count of order data
        let count = await Order.find({user: req.user._id}).countDocuments();

        // Find order include order items and exclude -createdAt
        let orders = await Order.find({user: req.user._id}).skip(parseInt(skip)).limit(parseInt(limit)).populate('order_items').sort('-createdAt');

        // Return response of order data and count as JSON
        return res.json({
            // Each order converts to JSON
            data: orders.map(order => order.toJSON({virtuals: true})),
            count
        });
    } catch (err) { // If error exists
        if(err && err.name === 'ValidationError'){ // If there's error about Validation
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            })
        }

        // Continue error to app.js
        next(err)
    }
}

// Export to router order
module.exports = {
    store, index
};