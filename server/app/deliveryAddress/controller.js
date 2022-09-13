// Import all needed dependencies
const DeliveryAddress = require('./model');

// These 2 dependencies are used for authorization
const { subject } = require('@casl/ability');
const { policyFor } = require('../../utils');

// Handle creating delivery address
const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let user = req.user;
        // Creating delivery address by request body and id user (token)
        let address = new DeliveryAddress({...payload, user: user._id});
        await address.save();
        return res.json(address);
    } catch (err) { // If error exists
        if(err && err.name === 'ValidationError'){ // If there's error about Validation
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        // continue error to app.js
        next(err);
    }
}

// Handle updating delivery address
const update = async (req, res, next) => {
    try {
        let {_id, ...payload} = req.body;
        // Find delivery address by id
        let {id} = req.params;
        let address = await DeliveryAddress.findById(id);

        // Handle Authorization for updating delivery address
        // Only logged user can update
        let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});
        let policy = policyFor(req.user);
        // If there's user with incorrect token or without token, then it will not be allowed to update
        if(!policy.can('update', subjectAddress)){
            return res.json({
                error: 1,
                message: `You're not allowed to modify this resource`
            });
        }
        // If there's user with correct token updating delivery address, then display response as JSON
        address = await DeliveryAddress.findByIdAndUpdate(id, payload, {new: true});
        return res.json(address);
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

// Handle deleting delivery address
const destroy = async (req, res, next) => {
    try {
        // Find delivery address by id
        let {id} = req.params;
        let address = await DeliveryAddress.findById(id);

        // Handle Authorization for deleting delivery address
        // Only logged user can delete
        let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});
        let policy = policyFor(req.user);
        // If there's user with incorrect token or without token, then it will not be allowed to update
        if(!policy.can('delete', subjectAddress)){
            return res.json({
                error: 1,
                message: `You're not allowed to delete this resource`
            });
        }
        // If there's user with correct token deleting delivery address, then display response as JSON
        address = await DeliveryAddress.findByIdAndDelete(id);
        res.json(address);
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

// Handle getting all delivery address
const index = async (req, res, next) => {
    try {
        //  skip and limit will be used for pagination in frontend
        let {skip = 0, limit = 10} = req.query;
        // handle count of data
        let count = await DeliveryAddress.find({user: req.user._id}).countDocuments();

        // find and display delivery address as JSON
        let address = await DeliveryAddress.find({user: req.user._id}).skip(parseInt(skip)).limit(parseInt(limit)).sort('-createdAt');
        return res.json({data: address, count});
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

// Export to router
module.exports = {
    store, update, destroy, index
}