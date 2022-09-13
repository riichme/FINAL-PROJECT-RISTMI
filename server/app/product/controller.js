// Import all needed dependencies
const path = require('path');
const fs = require('fs');
const config = require('../config');
const Product = require('./model');
const Category = require('../category/model');
const Tag = require('../tag/model');

// Handle creating product
const store = async (req,res, next) => {
    try {
        let payload = req.body;

        // relate to category
        if(payload.category){
            let category = await Category.findOne({
                name: {
                    $regex: payload.category,
                    $options: 'i'
                }
            });
            if(category){
                payload = {...payload, category: category._id};
            } else {
                delete payload.category;
            }
        }

        // relate to tags
        if(payload.tags && payload.tags.length > 0){
            let tags = await Tag.find({
                name: {
                   $in: payload.tags
                }
            });
            if(tags.length){
                payload = {...payload, tags: tags.map(tag => tag._id)};
            } else {
                delete payload.tags;
            }
        }

        // handle file upload
        if (req.file) { // if there's file to upload
            // handle file from operating system and all files will be saved to folder images/products
            let tmp_path = req.file.path; 
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            // If handling of image file success
            src.on('end', async () => {
                try {
                    // combine all request, save them and return respon as JSON
                    let product = new Product({...payload, image_url: filename});
                    await product.save();
                    return res.json(product)
                } catch (err) { // If error exists
                    // cancel handle file upload
                    fs.unlinkSync(target_path); 
                    if(err && err.name === 'ValidationError'){ // If there's error about Validation
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }

                    // continue error to app.js
                    next(err);
                }
            });

            // If there's error about handle file, then continue to app.js with error message
            src.on('error', async () => {
                next(err);
            });

        } else { // If there's no file upload
            // all request body will be displayed as JSON
            let product = new Product(payload);
            await product.save();
            return res.json(product);
        }
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

// Handle get all product without or with query
const index = async (req, res, next) => {
    try {
        //  skip and limit will be used for pagination in frontend
        let { skip = 0, limit = 10, q = '', category = '', tags = [] } = req.query;

        // handle no-sensitive-case for query
        let criteria = {};
        if(q.length){
            criteria = {
                ...criteria,
                name: {$regex: `${q}`, $options: 'i'}
            }
        }

        // handle no-sensitive-case for category and relate to category
        if(category.length){
            category = await Category.findOne({
                name: {
                    $regex: `${category}`,
                    $options: 'i'
                }
            });

            if(category){
                criteria = {...criteria, category: category._id}
            }
        }

        // relate to tags
        if(tags.length){
            tags = await Tag.find({name: {$in: tags}});
            if(tags){
                criteria = {...criteria, tags: {$in: tags.map(tag => tag._id)}}
            }
        }

        // handle count of product data
        let count = await Product.find().countDocuments();

        // display product as JSON
        let product = await Product
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate('category') // relate to category
        .populate('tags'); // relate to tags
        return res.json({
            data: product,
            count
        })
    } catch (err) { // if error exists
        // continue error message to app.js
        next(err);
    }
}

// Handle updating product
const update = async (req,res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params; // product updated based on parameter

        // relate to category
        if(payload.category){
            let category = await Category.findOne({
                name: {
                    $regex: payload.category,
                    $options: 'i'
                }
            });
            if(category){
                payload = {...payload, category: category._id};
            } else {
                delete payload.category;
            }
        }

        /// relate to tags
        if(payload.tags && payload.tags.length > 0){
            let tags = await Tag.find({
                name: {
                    $in: payload.tags
                }
            });
            if(tags.length){
                payload = {...payload, tags: tags.map(tag => tag._id)};
            } else {
                delete payload.tags;
            }
        }

        // handle file upload
        if (req.file) { // if there's file to upload
            // handle file from operating system and all files will be saved to folder images/products
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            // If handling of image file success
            src.on('end', async () => {
                try {
                    // Find Product by Id
                    let product = await Product.findById(id);
                    // Remove latest image file
                    let currentImage = `${config.rootPath}/public/images/products/${product.image_url}`;
                    if(fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage);
                    }
                    // Find Product by Id, update and display response as JSON
                    product = await Product.findByIdAndUpdate(id, payload, {
                        new: true,
                        runValidators: true
                    });
                    return res.json(product)
                } catch (err) { // If error exists
                    // Cancel file handling
                    fs.unlinkSync(target_path);
                    if(err && err.name === 'ValidationError'){ // If there's error about Validation
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }
                    // continue error to app.js
                    next(err);
                }
            });
            // If there's error about file upload, continue to app.js 
            src.on('error', async () => {
                next(err);
            });

        } else { // If there's no file upload
            // Find Product by Id, update and display response as JSON
            let product = await Product.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true
            });
            return res.json(product);

        }
    } catch (err) { // If error exists
        if(err && err.name === 'ValidationError'){
            // If there's error about Validation
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

// Handle deleting product
const destroy = async (req, res, next) => {
    try {
        // Find and delete Product by Id
        let product = await Product.findByIdAndDelete(req.params.id);
        // Handle deleting current image
        let currentImage = `${config.rootPath}/public/images/products/${product.image_url}`;
        if(fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        }
        // Display response as JSON
        return res.json(product);
    } catch (err) { // If error exists continue to app.js
        next(err); 
    }
}

// Export to router
module.exports = {
    store, index, update, destroy
}