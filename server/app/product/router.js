// Import all needed dependencies
const router = require('express').Router();
const multer = require('multer'); // dependency for handle file
const os = require('os'); 
const { policy_check } = require('../../middlewares'); // dependency for authorization
const { store, index, update, destroy } = require('./controller');

// router
router.get('/products', index);
router.post('/products', multer({dest: os.tmpdir()}).single('image'), policy_check('create', 'Product'), store);
router.put('/products/:id', multer({dest: os.tmpdir()}).single('image'), policy_check('update', 'Product') , update);
router.delete('/products/:id', policy_check('delete', 'Product'), destroy);

// export to app.js
module.exports = router;