const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/db');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        User.getUserById(jwt_payload._id, (error,user)=>{
        if(error){
            return done(error, false);
            }
        if(user){
            return done(user, true);
            }
        else{
            return done(null, false);
            }
        })
    }))
}