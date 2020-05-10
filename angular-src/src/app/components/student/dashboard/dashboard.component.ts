import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "../../../services/validate.service";

declare var p5: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  foo: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) {}

  ngOnInit() {
    var data = localStorage.getItem("user");
    var object = JSON.parse(data);
    // console.log(object);

    console.log("inside dashboard component student ");
    document.querySelector("#name").innerHTML = object.username;
    setTimeout(function () {
      this.foo = new p5.Speech();
      const sketch = (s) => {
        s.setup = () => {
          this.foo.speak(
            `hi ${object.username}, welcome to Personalysis, the personality cum stress quiz. This test is designed to find out what you are like as a person. This test consists of three sections namely :- Audio Test , Situational MCQs and Stress Test. `
          );
          console.log("hii..");
        };
      };

      let canvas = new p5(sketch);
    }, 2000);
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

  algo() {
    this.router.navigate(["studentsoftware"]);
  }
}
