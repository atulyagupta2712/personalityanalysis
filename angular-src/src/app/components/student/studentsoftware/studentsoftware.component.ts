import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { FormControl, FormGroup } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

declare var p5: any;

@Component({
  selector: "app-studentsoftware",
  templateUrl: "./studentsoftware.component.html",
  styleUrls: ["./studentsoftware.component.css"],
})
export class StudentsoftwareComponent implements OnInit {
  questions: any;
  questionObject: any;
  score: number = 0;
  questionIndex: number = 0;
  quesForm: FormGroup;
  foo: any;
  foo1: any;
  mic: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
    this.questionObject = {};
    this.quesForm = new FormGroup({
      option: new FormControl(),
    });
  }

  ngOnInit() {
    this.authService.getSoftwareQuestion().subscribe(
      (data) => {
        if (data.success) {
          this.questions = data.msg;
          this.questionObject = this.questions[this.questionIndex];
        }
      },
      (error) => {
        console.log(error);
      }
    );
    setTimeout(function () {
      this.foo = new p5.Speech();
      const sketch = (s) => {
        s.setup = () => {
          this.foo.speak(
            "This is the Audio test section. Here you have to speak the following lines so that your voice can be recorded and analysed. Please note that you have to speak all the lines in one go."
          );
          console.log("hii..");
        };
      };
      let canvas = new p5(sketch);
    }, 2000);
  }

  startMic() {
    this.foo1 = new p5.SpeechRec("en-US", () => {
      console.log(this.foo1.resultString);
    });
    this.foo1.continuous = true; // do continuous recognition
    this.foo1.interimResults = false;
    const sketch = (s) => {
      s.setup = () => {
        this.foo1.start();
      };
    };
    let canvas = new p5(sketch);
  }

  stopMic() {
    this.router.navigate(["studentalgo"]);
  }

  onLogoutClick() {
    this.authService.onLogout();
    this.flashMessage.show("You have logged out successfully", {
      cssClass: "alert-success",
      timeout: 4000,
    });
    this.router.navigate(["/"]);
    return false;
  }
  onsoftware() {
    var data = this.quesForm.get("option").value;
    if (!data) {
      this.flashMessage.show("Please choose 1 option!", {
        cssClass: "alert-danger",
        timeout: 4000,
      });
    } else {
      if (data == this.questionObject.correctAnswer) {
        this.score++;
      }
      // console.log(this.questionIndex);
      if (this.questionIndex < this.questions.length) {
        this.questionIndex++;
        this.questionObject = this.questions[this.questionIndex];
      }
      if (this.questionIndex == this.questions.length) {
        // this.again();
      }
      this.quesForm = new FormGroup({
        option: new FormControl(),
      });
    }
  }
}
