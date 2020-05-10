import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";

declare var p5: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isValid = false;
  teacher = true;
  student = true;
  foo: any;
  count = 1;
  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("window") == null) {
      window.location.reload();
      localStorage.setItem("window", JSON.stringify("1"));
    }
    if (localStorage.getItem("user") || localStorage.getItem("teacher")) {
      this.isValid = !this.isValid;
    }
    if (localStorage.getItem("user")) {
      this.student = false;
    }
    if (localStorage.getItem("teacher")) {
      this.teacher = false;
    }

    // this.foo = new p5.Speech();
    // const sketch = (s) => {
    //   s.setup = () => {
    //     if (this.count == 1) {
    //       this.foo.speak(
    //         "hi there, welcome to Personalysis, the personality cum stress quiz.Here, you have to speak the following lines, so that your voice can be recorded and analysed.Please note that you have to speak all the lines in one go. "
    //       );
    //       console.log("hii.. from home component");

    //       this.count++;
    //     }
    //   };
    // };
    // let canvas = new p5(sketch);
  }

  onTeacher() {
    localStorage.setItem("window", null);
    this.router.navigate(["/tlogin"]);
  }
  onStudent() {
    localStorage.setItem("window", null);
    this.router.navigate(["/login"]);
  }
  onTeacherReg() {
    localStorage.setItem("window", null);
    this.router.navigate(["/tregister"]);
  }
  onStudentReg() {
    localStorage.setItem("window", null);
    this.router.navigate(["/register"]);
  }

  studentd() {
    localStorage.setItem("window", null);
    this.router.navigate(["dashboard"]);
  }
  teacherd() {
    localStorage.setItem("window", null);
    this.router.navigate(["tdashboard"]);
  }
}
