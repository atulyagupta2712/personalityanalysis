const mongoose = require("mongoose");
const config = require("../config/db");
const passwordHash = require("password-hash");

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);


module.exports.getUserById= function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    var hashedPassword = passwordHash.generate(newUser.password);
    newUser.password = hashedPassword;
    newUser.save(callback);
}

module.exports.compare = function(password, hashedPassword, callback){
    if(  passwordHash.verify(password, hashedPassword)){
        callback(null, true);
    }
    else{
        callback(null, false);

    }
    // passwordHash.verify(password, hashedPassword, (error, isMatch)=>{
    //     if(error){
    //         throw error;
    //     }
    //    callback(null, isMatch);
    // })
}