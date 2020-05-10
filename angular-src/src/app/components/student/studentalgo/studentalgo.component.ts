import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { FormControl, FormGroup } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

declare var p5: any;

@Component({
  selector: "app-studentalgo",
  templateUrl: "./studentalgo.component.html",
  styleUrls: ["./studentalgo.component.css"],
})
export class StudentalgoComponent implements OnInit {
  questions: any;
  foo: any;
  value: any;
  questionIndex: number = 0;
  questionObject: any;
  score: number = 1;
  scoreArray = [];
  quesForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {
    this.questionObject = {};
    this.quesForm = new FormGroup({
      option: new FormControl(),
    });
  }

  ngOnInit() {
    this.authService.getAlgoQuestion().subscribe(
      (data) => {
        if (data.success) {
          this.questions = data.msg;
          this.questionObject = this.questions[this.questionIndex];
        }
      },
      (error) => {
        console.log("error is ", error);
        return false;
      }
    );
    setTimeout(function () {
      this.foo = new p5.Speech();

      const sketch = (s) => {
        s.setup = () => {
          this.foo.speak(
            `This is the Situational MCQs section.Here, You will be given a situational question and you have to choose one answer from the two options mentioned. `
          );
          console.log("hii..");
        };
      };

      let canvas = new p5(sketch);
    }, 1000);
  }

  onalgo() {
    var data = this.quesForm.get("option").value;
    console.log("inside student algo ", data);
    if (!data) {
      this.flashMessage.show("Please choose 1 option!", {
        cssClass: "alert-danger",
        timeout: 4000,
      });
    } else {
      if (this.questionIndex < 4) {
        if (data == this.questions[this.questionIndex].option1) {
          console.log(true);
          this.scoreArray.push(this.questions[this.questionIndex].option2);
        }

        if (data == this.questions[this.questionIndex].option3) {
          console.log("hey");
          this.scoreArray.push(this.questions[this.questionIndex].option4);
        }

        console.log(this.scoreArray);
      }

      if (this.questionIndex < this.questions.length) {
        this.questionIndex++;
        this.questionObject = this.questions[this.questionIndex];
      }
      if (this.questionIndex == this.questions.length) {
        this.finish();
      }
      this.quesForm = new FormGroup({
        option: new FormControl(),
      });
    }
  }
  finish() {
    localStorage.setItem("score", JSON.stringify(this.scoreArray));
    // localStorage.setItem('length', this.questions.length);
    this.router.navigate(["userstress"]);
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
}
