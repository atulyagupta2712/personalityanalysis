import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    console.log("validateRegister(user)");
    if(user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }
  validatePay(user){
    if(user.name == undefined || user.email == undefined || user.phone == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateDetailedForm(user){
    if(user.name == undefined || user.number == undefined || user.email == undefined || user.expertise == undefined || user.experience == undefined || user.address == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateLogin(user){
    // console.log("validateRegister(user)");
    if( user.username == undefined ||user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }
  validateEmail(email){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
  }
  validatePassword(password){
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
    return re.test(password) && password.length > 7;
  }

  validateQuestion(question){
    if(question.questionName && question.option1 && question.option2 && question.option3 && question.option4){
      return true;
    }
    else{
      return false;
    }
  }

  validateAnswer(question){
    if(question.correctAnswer == question.option1 || question.correctAnswer == question.option2 || question.correctAnswer == question.option3 || question.correctAnswer == question.option4){
      return true;
    }
    return false;
  }

}
