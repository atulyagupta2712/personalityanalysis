const mongoose = require('mongoose');
const config = require('../config/db');
const passwordHash = require('password-hash');

const psychologists = mongoose.Schema({
   
  name: {
      type: String
    },
  email: {
      type: String
  },
  number: {
      type: Number
  },
  expertise: {
      type: String
    },
  experience: {
      type: String
    },
  address: {
      type: String
    }
   
});

const subjectSchema = mongoose.Schema({
    testName: {
        type: String
    },
    questions: {
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
    }
   
    

})

const psychologist = module.exports = mongoose.model('psychologists', psychologists);



module.exports.addQuestion = function(newQuestion,callback){
    
    // var hashedAnswer = passwordHash.generate(newQuestion.correctAnswer);
    // newQuestion.correctAnswer = hashedAnswer;
    newQuestion.save(callback);
}

