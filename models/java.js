const mongoose = require('mongoose');
const config = require('../config/db');
const passwordHash = require('password-hash');

const questions = mongoose.Schema({
   
    questionName: {
        type: String
      },
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3: {
        type: String
      },
    option4: {
        type: String
      },
      option5: {
        type: String
      },
    correctAnswer: {
        type: String
      }
     
  });
 

  const javaQuestion = module.exports = mongoose.model('javaQuestion', questions);

  module.exports.addJavaQuestion = function(javaQuestion,callback){
  
    javaQuestion.save(callback);
}