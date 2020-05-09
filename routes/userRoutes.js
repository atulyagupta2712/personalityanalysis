const express = require('express');
const router = express.Router();
const User = require("../models/user");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const algo = require('../models/algo');
const software = require('../models/software');
const java = require('../models/java');
const stress = require('../models/stress');
const psychologist = require('../models/psychologist');
const teacher = require('../models/teacher')
let users;

router.post('/register', (request, response, next)=>{
    
    let newUser = new User({
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });
    User.addUser(newUser, (error, user)=>{
        if(error){
             response.json({success: false, msg: 'Failed to register the user'});
        }
        else{
             response.json({success: true, msg: '"You have been registered sucessfully, now you may login"'});
            // response.send(user);
        }
    })
    // response.send("register");

});
router.get('/allusers', (req,res,next)=>{
    User.find({}, (error,users)=>{
        if(error){
            res.json({'success': false, 'msg': 'Failed to get the questions'});
        }
        else{
            res.json({'success': true, 'msg': users});
        }
    })
    // let user = {
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password
    // };
    // let count = 0;    
    // User.find({}).toArray((err, Users) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).send(err);
    //     }
    //     for(let i = 0; i < Users.length; i++){
    //         if(Users[i].username == user.username)
    //         count++;
    //     }
    //     // Add user if not already signed up
    //     if(count == 0){
    //         users.insert(user, (err, User) => {
    //             if(err){
    //                 res.send(err);
    //             }
    //             res.json(User);
    //         });
    //     }
    //     else {
    //         res.json({ user_already_signed_up: true });
    //     }
    // });
    
})
router.post('/authenticate', (request, response, next)=>{
    // response.send("authenticate");
    const username = request.body.username;
    const password = request.body.password;
    User.getUserByUsername(username, (error, user)=>{
    
        if(error){
            return response.json({success: false, msg: "There is some error"})
        }
        if(!user){
            return response.json({success: false, msg: "User not found"})
        }
        else{
          
            User.compare(password, user.password, (error, isMatch)=>{
               
               
                if(error){
                  throw error;
                }
                if(isMatch){
                    console.log("matched "+user.toJSON());

                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 3600,


                    });
                    return response.json({
                        success: true,
                        token: 'jwt'+token,
                        msg: "You have been logged in successfully!",
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                    } })
                }
                else{
                    return response.json({success: false, msg:"Invalid username or password"})
                }
            })
        }
    })
    
});

router.get('/profile', (request, response, next)=>{
    // console.log(token);
  response.json({user: request.user});
    
});

router.get('/algo', (request, response, next)=>{
    algo.find({}, (error,questions)=>{
        if(error){
            response.json({'success': false, 'msg': 'Failed to get the questions'});
        }
        else{
            response.json({'success': true, 'msg': questions});
        }
    })
});

router.get('/software', (request,response,next)=>{
    software.find({}, (error,questions)=>{
        if(error){
            response.json({'success': false, 'msg': 'Failed to get the questions'});
        }
        else{
            response.json({'success': true, 'msg': questions});
        }
    })

});

router.get('/java', (request,response,next)=>{
    java.find({}, (error,questions)=>{
        if(error){
            response.json({'success': false, 'msg': 'Failed to get the questions'});
        }
        else{
            response.json({'success': true, 'msg': questions});
        }
    })
})

router.get('/stress', (request,response,next)=>{
    stress.find({}, (error,questions)=>{
        if(error){
            response.json({'success': false, 'msg': 'Failed to get the questions'});
        }
        else{
            response.json({'success': true, 'msg': questions});
        }
    })
})

router.get('/psychologist', (request,response,next)=>{
    teacher.find({}, (error,questions)=>{
        if(error){
            response.json({'success': false, 'msg': 'Failed to get the questions'});
        }
        else{
            response.json({'success': true, 'msg': questions});
        }
    })
})
router.get('/psychologistanalyse', (request,response,next)=>{
    psychologist.find({}, (error,questions)=>{
        if(error){
            response.json({'success': false, 'msg': 'Failed to get the questions'});
        }
        else{
            response.json({'success': true, 'msg': questions});
        }
    })
})
module.exports = router;