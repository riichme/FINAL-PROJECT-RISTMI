// Import all needed dependencies
const User = require('../user/model'); // get user model from database

// these 3 dependencies are used for user authentification and token
const bcrypt = require('bcrypt'); 
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config'); // get dotenv config

const { getToken } = require('../../utils'); // get token from folder utils

// handle user registration
const register = async (req, res, next) => {
    try {
        const payload = req.body;
        let user = new User(payload);
        await user.save();
        return res.json(user);
    } catch (err) { // if error 
        if(err && err.name === 'ValidationError'){ 
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        // jika terdapat error lain teruskan middleware pada app.js
        next(err);
    }
}

// handle password comparing between password from parameter and from database
const localStrategy = async (email, password, done) => {
    try {
        let user = await User.findOne({email}).select('-__v -createdAt -updatedAt -cart_items -token');
        if(!user){
            return done();
        }
        if(bcrypt.compareSync(password, user.password)){
            ( {password, ...userWithoutPassword} = user.toJSON() );
            return done(null, userWithoutPassword);
        }
    } catch (err) { // if error 
        done(err, null);
    }
    done();
}

// handle user login
const login = async (req, res, next) => {
    passport.authenticate('local', async function(err, user){
        if(err) return next(err);
        
        if(!user) return res.json({
            error: 1,
            message: 'Email or Password Incorrect'
        });

        let signed = jwt.sign(user, config.secretKey);

        await User.findByIdAndUpdate(user._id, {$push: {token: signed}});

        res.json({
            message: 'Login Success',
            user,
            token: signed
        })
    })(req, res, next)
}

// handle user logout
const logout = async (req, res, next) => {
    let token = getToken(req);

    let user = await User.findOneAndUpdate({token: {$in: [token]}}, {$pull: {token}}, {useFindAndModify: false});

    if(!token || !user) {
        res.json({
            error: 1,
            message: 'No User Found!!!'
        });
    }

    return res.json({
        error: 0,
        message: 'Logout Berhasil'
    })
}

// handle data user from given token
const me = (req, res, next) => {
    if(!req.user){
        res.json({
            err: 1,
            message: `You're not login or token expired`
        })
    }
    console.log(req);
    res.json(req.user);
}

// export to router.js
module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me
}