// Import all needed dependencies
const router = require('express').Router();
const { policy_check } = require('../../middlewares'); // dependency for authorization
const { index, store, update, destroy } = require('./controller');

// router
router.get('/tags', index);
router.post('/tags', policy_check('create', 'Tag'), store);
router.put('/tags/:id', policy_check('update', 'Tag'), update);
router.delete('/tags/:id', policy_check('delete', 'Tag'), destroy);

// Export to app.js
module.exports = router;