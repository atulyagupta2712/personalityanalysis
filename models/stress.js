const mongoose = require('mongoose');
// const config = require('../config/db');
// const passwordHash = require('password-hash');

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
    correctAnswer: {
        type: String
      }
     
  });


  const stressQuestion = module.exports = mongoose.model('stressQuestion', questions);

  module.exports.addStressQuestion = function(stressQuestion,callback){

    stressQuestion.save(callback);
}