// Import all needed dependencies
const router = require('express').Router();
const { policy_check } = require('../../middlewares'); // dependency for authorization
const { update, index } = require('./controller');


// router
router.put('/carts', policy_check('update', 'Cart'), update);
router.get('/carts', policy_check('read', 'Cart'), index);


// export to app.js
module.exports = router;