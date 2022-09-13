// Import all needed dependencies
const router = require('express').Router();
const { policy_check } = require('../../middlewares');
const { index, store, update, destroy } = require('./controller');

// router
router.get('/delivery-addresses', policy_check('view', 'DeliveryAddress'), index);
router.post('/delivery-addresses', policy_check('create', 'DeliveryAddress'), store);
router.put('/delivery-addresses/:id', update);
router.delete('/delivery-addresses/:id', destroy);

// Export to app.js
module.exports = router;