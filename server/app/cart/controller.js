// Import Model from Product and Cart Item
const Product = require('../product/model');
const CartItem = require('../cart-item/model');

// Handle updating cart
const update = async (req, res, next) => {
    try {
        // Find Products with id from request body where consist of the chosen products that respresented by their Ids
        const {items} = req.body;
        // ProductIds result array of product ids from request body 
        const productIds = items.map(item => item.product._id);
        // Convert all productIds into list of data products
        const products = await Product.find({_id: {$in: productIds}});
        
        // Cart items will return object of chosen product id, product price, product image, product name, logged user, and quantity
        let cartItems = items.map(item => {
            // Related Product is product in list of products where its id is same as product id from request body
            let relatedProduct = products.find(product => product._id.toString() === item.product._id);
            return {
                product: relatedProduct._id,
                price: relatedProduct.price,
                image_url: relatedProduct.image_url,
                name: relatedProduct.name,
                user: req.user._id,
                qty: item.qty
            }
        });

        // Delete cart item by id from logged user
        await CartItem.deleteMany({user: req.user._id});
        // Update the cart items in bulkWrite operation
        // This means cart items can be inserted, updated, and deleted 
        await CartItem.bulkWrite(cartItems.map(item => {
            return {
                // the item will be updated and display product and id of logged user
                updateOne: {
                    filter: {
                        user: req.user._id,
                        product: item.product
                    },
                    update: item, // existed item will be updated
                    upsert: true // new item will be inserted
                }
            }
        }));

        // return response of cart items as JSON
        return res.json(cartItems)
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

// Handle get cart items
const index = async (req, res, next) => {
    try {
        // Find the Cart Items by userID, relate to product data of them and display as JSON
        let items = await CartItem.find({user: req.user._id}).populate('product');

        return res.json(items)
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

// Export to cart router
module.exports = {
    update, index
}