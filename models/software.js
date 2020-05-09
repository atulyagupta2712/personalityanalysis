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
    correctAnswer: {
        type: String
      }
     
  });


  const softwareQuestion = module.exports = mongoose.model('softwareQuestion', questions);

  module.exports.addSoftwareQuestion = function(softwareQuestion,callback){

    softwareQuestion.save(callback);
}