// Import Model
const Tag = require('./model');

// Handle creating tags
const store = async (req, res, next) => {
    try {
        // all request body (payload) will be displayed as JSON
        let payload = req.body;
        let tag = new Tag(payload);
        await tag.save();
        return res.json(tag);
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

// Handle updating tags
const update = async (req, res, next) => {
    try {
        // Find Tags by Id, update request body and display response as JSON
        let payload = req.body;
        let tag = await Tag.findByIdAndUpdate(req.params.id, payload, {new: true, runValidators: true});
        return res.json(tag);
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

// Handle deleting tags
const destroy = async (req, res, next) => {
    try {
        // Find and delete Tags by Id, then display response as JSON
        let tag = await Tag.findByIdAndDelete(req.params.id);
        return res.json(tag);
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

// Handle get all tags
const index = async (req, res, next) => {
    try {
        // Find all tags and display as JSON
        let tag = await Tag.find();
        return res.json(tag);
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