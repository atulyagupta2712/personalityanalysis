import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup} from '@angular/forms'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-studentsoftware',
  templateUrl: './studentsoftware.component.html',
  styleUrls: ['./studentsoftware.component.css']
})
export class StudentsoftwareComponent implements OnInit {

  questions:any;
  questionObject: any;
  score: number=0;
  questionIndex: number=0;
  quesForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) { 
    this.questionObject={};
    this.quesForm = new FormGroup({
      option: new FormControl()
    })
  }

  ngOnInit() {

    this.authService.getSoftwareQuestion().subscribe(data=>{
      if(data.success){
        this.questions = data.msg;
        this.questionObject= this.questions[this.questionIndex];
      }
    },
  error=>{
    console.log(error);
  })
  }
   onLogoutClick(){
    this.authService.onLogout();
    this.flashMessage.show('You have logged out successfully', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/']);
    return false;
  }
  onsoftware(){
    var data = this.quesForm.get('option').value;
    if(!data){
      this.flashMessage.show("Please choose 1 option!", {cssClass: 'alert-danger',  timeout: 4000});
     }
     else{
      if(data == this.questionObject.correctAnswer){
        this.score++;
      }
      // console.log(this.questionIndex);
      if(this.questionIndex < this.questions.length){
        this.questionIndex++;
        this.questionObject = this.questions[this.questionIndex];
      }
      if(this.questionIndex == this.questions.length){
        this.again();
      }
      this.quesForm = new FormGroup({
        option: new FormControl()
      })
     }
    
  }
  again(){
    // localStorage.setItem('score', JSON.stringify(this.score));
    // localStorage.setItem('length', this.questions.length);
    this.router.navigate(['studentjava']);
  }
}
