// Import all needed dependencies
const router = require('express').Router();
const { policy_check } = require('../../middlewares'); // dependency for authorization
const { store, index } = require('./controller');


// router
router.post('/orders', policy_check('create', 'Order'), store);
router.get('/orders', policy_check('view', 'Order'), index);

// export to app.js
module.exports = router;