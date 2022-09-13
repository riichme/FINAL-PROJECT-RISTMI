// Import all needed dependencies
const router = require('express').Router();
const { show } = require('./controller');

// router
router.get('/invoice/:order_id', show);

// export to app.js
module.exports = router;