import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tregister',
  templateUrl: './tregister.component.html',
  styleUrls: ['./tregister.component.css']
})
export class TregisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onRegister() {

    const teacher = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password

    }
    if (!this.validateService.validateRegister(teacher)) {
      this.flashMessage.show("Please fill in all the fields", { cssClass: 'alert-danger', timeout: 4000 });
      return false;
    }
    else {
      if (!this.validateService.validateEmail(teacher.email)) {
        this.flashMessage.show("Please type a valid email", { cssClass: 'alert-danger', timeout: 4000 })
      }
      else {
        if (!this.validateService.validatePassword(teacher.password)) {
          this.flashMessage.show("Password should have atleast 1 uppercase letter, one number and the length should be greater than 7", { cssClass: 'alert-danger', timeout: 4000 });
        }
        else {
          this.authService.registerTeacher(teacher).subscribe((data) => {

            if (data.success) {
              this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 4000 });
              this.router.navigate(['tchatroom']);
            }
            else {
              // console.log("dataregisteredd");
              this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 4000 });
              this.router.navigate(['/tregister']);
            }
          })
        }
      }
    }
  }

  onLogin() {
    this.router.navigate(['tlogin']);
  }

}
