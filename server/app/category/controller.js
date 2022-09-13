// Import Model
const Category = require('./model');

// Handle creating category
const store = async (req, res, next) => {
    try {
        // all request body (payload) will be displayed as JSON
        let payload = req.body;
        let category = new Category(payload);
        await category.save();
        return res.json(category);
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

// Handle updating category
const update = async (req, res, next) => {
    try {
        // Find Category by Id, update request body and display response as JSON
        let payload = req.body;
        let category = await Category.findByIdAndUpdate(req.params.id, payload, {new: true, runValidators: true});
        return res.json(category);
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

// Handle deleting category
const destroy = async (req, res, next) => {
    try {
        // Find and delete Category by Id, then display response as JSON
        let category = await Category.findByIdAndDelete(req.params.id);
        return res.json(category);
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

// Handle get all category
const index = async (req, res, next) => {
    try {
        // Find all category and display as JSON
        let category = await Category.find();
        return res.json(category);
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
    index, store, update, destroy
}