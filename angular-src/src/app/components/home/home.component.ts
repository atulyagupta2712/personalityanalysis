import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

declare var p5: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isValid= false;
  teacher = true;
  student= true;
  foo: any;
  count=1;
  constructor(private router: Router) {}

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
   
   this.foo = new p5.Speech();
   console.log(this.foo)
    const sketch = (s) => {
      s.setup = () => {
        if(this.count == 1){
          this.foo.speak('hi there, welcome to Personalysis, the personality cum stress quiz. Please register if you are new here or login if you have already been here.');
          console.log("hii..")
          this.count++;
        }
      };
    }
    let canvas = new p5(sketch);
  }


  refresh(){
    window.location.reload();
    console.log('reload')
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
