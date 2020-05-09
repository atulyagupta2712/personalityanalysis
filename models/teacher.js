const mongoose = require('mongoose');
const config = require('../config/db');
const passwordHash = require('password-hash');

const teacherSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
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

const Teacher = module.exports = mongoose.model('Teacher', teacherSchema);

module.exports.getTeacherById = function(id,callback){
    Teacher.findById(id,callback);
}

module.exports.getTeacherByUsername = function(username,callback){
    const query = {username: username};
    Teacher.findOne(query, callback);
}
module.exports.addTeacher = function(newTeacher, callback){
    var hashedPassword = passwordHash.generate(newTeacher.password);
    newTeacher.password = hashedPassword;
    newTeacher.save(callback);
}

module.exports.compare = function(password, hashedPassword, callback){
    if(passwordHash.verify(password,hashedPassword)){
        callback(null,true)
    }
    else{
       callback(null,false);
    }
}

