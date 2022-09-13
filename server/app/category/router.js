// Import all needed dependencies
const router = require('express').Router();
const { policy_check } = require('../../middlewares'); // dependency for authorization
const { index, store, update, destroy } = require('./controller');

// router
router.get('/categories', index);
router.post('/categories', policy_check('create', 'Category'), store);
router.put('/categories/:id', policy_check('update', 'Category'), update);
router.delete('/categories/:id', policy_check('delete', 'Category'), destroy);

// export to app.js
module.exports = router;