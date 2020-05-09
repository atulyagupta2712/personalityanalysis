import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isValid= false;
  teacher = true;
  student= true;
  constructor(private router: Router) { }

  ngOnInit() {
   if(localStorage.getItem('user')|| localStorage.getItem('teacher')){
     this.isValid= !this.isValid;
   }
   if(localStorage.getItem('user')){
     this.student= false;
   }
   if(localStorage.getItem('teacher')){
     this.teacher= false;
   }
  }
  
  onTeacher(){
    this.router.navigate(['/tlogin']);
  }
  onStudent(){
    this.router.navigate(['/login']);
  }
  onTeacherReg(){
    this.router.navigate(['/tregister']);
  }
  onStudentReg(){
    this.router.navigate(['/register']);
  }

  studentd(){
    this.router.navigate(['dashboard']);
  }
  teacherd(){
    this.router.navigate(['tdashboard']);
  }

}
