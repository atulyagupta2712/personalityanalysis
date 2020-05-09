const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const algo = require('../models/algo');
const software = require('../models/software');
const java = require('../models/java');
const stress = require('../models/stress');
const psychologist = require('../models/psychologist')
router.post('/register',(request,response,next)=>{
    // console.log('register')
    let newTeacher = new Teacher({
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });
    Teacher.addTeacher(newTeacher,(error,teacher)=>{
        if(error){
            response.json({success: false, msg: "Failed to register the teacher"});
        }
        else{
            response.json({success: true, msg: "You have been registered successfully, now you may login"})
        }
    });
});

router.post('/login', (request,response,next)=>{
    const username = request.body.username;
    const password = request.body.password;
    Teacher.getTeacherByUsername(username, (error,teacher)=>{
        if(error){
            response.json({success: false, msg: 'There is some error'});
        }
       
            if(!teacher){
                response.json({success: false, msg: 'Teacher not found'});
            }
            else{
                Teacher.compare(password, teacher.password, (error, isMatch)=>{
                    if(error){
                        throw error;
                    }
                   
                    if(isMatch){
                        const token = jwt.sign(teacher.toJSON(), config.secret, {
                            expiresIn: 36000,
                        })
                        response.json({
                            success: true, 
                            msg: 'You have been succesfully logged in!',
                            token: 'Jwt '+token,
                            teacher:{
                                id: teacher._id,
                                name: teacher.name,
                                email: teacher.email,
                                username: teacher.username
                            }    
                        })
                    }
                    else{
                        response.json({success: false, msg: 'Invalid username or password'});
                    }
                })
            
        }
    })
})
router.post('/algoques', (request,response,next)=>{
    let newQuestion = new algo({
          questionName : request.body.questionName,
                option1 : request.body.option1,
                option2 : request.body.option2,
                option3 : request.body.option3,
                option4 : request.body.option4,
                correctAnswer : request.body.correctAnswer
        
   
    })
    algo.addAlgoQuestion(newQuestion, (error, question)=>{
        if(error){
            response.json({success: false, msg: 'Failed to add the question'})
        }
        else{
            response.json({success: true, msg: ''});
        }
    })
})

router.post('/softwareques',(request, response,next)=>{
    let newQuestion = new software({
        questionName : request.body.questionName,
              option1 : request.body.option1,
              option2 : request.body.option2,
              option3 : request.body.option3,
              option4 : request.body.option4,
              correctAnswer : request.body.correctAnswer
      
 
  })
  software.addSoftwareQuestion(newQuestion, (error, question)=>{
      if(error){
          response.json({success: false, msg: 'Failed to add the question'})
      }
      else{
          response.json({success: true, msg: ''});
      }
  })
} );


router.post('/javaques',(request, response,next)=>{
    let newQuestion = new java({
        questionName : request.body.questionName,
              option1 : request.body.option1,
              option2 : request.body.option2,
              option3 : request.body.option3,
              option4 : request.body.option4,
              option5 : request.body.option5,
              correctAnswer : request.body.correctAnswer
      
 
  })
  java.addJavaQuestion(newQuestion, (error, question)=>{
      if(error){
          response.json({success: false, msg: 'Failed to add the question'})
      }
      else{
          response.json({success: true, msg: ''});
      }
  })
} )

router.post('/stressques',(request, response,next)=>{
    let newQuestion = new stress({
        questionName : request.body.questionName,
              option1 : request.body.option1,
              option2 : request.body.option2,
              option3 : request.body.option3,
              option4 : request.body.option4,
            //   option5 : request.body.option5,
              correctAnswer : request.body.correctAnswer
      
 
  })
  stress.addStressQuestion(newQuestion, (error, question)=>{
      if(error){
          response.json({success: false, msg: 'Failed to add the question'})
      }
      else{
          response.json({success: true, msg: ''});
      }
  })
} )

router.post('/psychologist',(request, response,next)=>{
    let newQuestion = new psychologist({
                name : request.body.name,
              email : request.body.email,
              number : request.body.number,
              expertise : request.body.expertise,
              experience : request.body.experience,
            //   option5 : request.body.option5,
              address : request.body.address
      
 
  })
  psychologist.addQuestion(newQuestion, (error, question)=>{
      if(error){
          response.json({success: false, msg: 'Failed to add the question'})
      }
      else{
          response.json({success: true, msg: ''});
      }
  })
} )


// router.get('/profile', passport.authenticate('jwt',{session: false}),(request,response,next)=>{
//     response.json()
// })
module.exports = router;