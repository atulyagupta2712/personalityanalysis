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

const algoQuestion = module.exports = mongoose.model('algoQuestion', questions);



module.exports.addAlgoQuestion = function(newQuestion,callback){
    
    // var hashedAnswer = passwordHash.generate(newQuestion.correctAnswer);
    // newQuestion.correctAnswer = hashedAnswer;
    newQuestion.save(callback);
}

