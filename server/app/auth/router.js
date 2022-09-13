// Import all needed dependencies
const router = require('express').Router();
const { register, login, localStrategy, logout, me } = require('./controller');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// middleware for user authentification
// taken from localStrategy
passport.use(new LocalStrategy({usernameField: 'email'}, localStrategy));

// router
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);

// export
module.exports = router;