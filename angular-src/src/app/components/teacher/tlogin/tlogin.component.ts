import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-tlogin',
  templateUrl: './tlogin.component.html',
  styleUrls: ['./tlogin.component.css']
})
export class TloginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
  }
  onLoginSubmit() {

    const teacher = {
      username: this.username,
      password: this.password
    };
    if (!this.validateService.validateLogin(teacher)) {
      this.flashMessage.show("Please fill in all the fields", { cssClass: 'alert-danger', timeout: 4000 });
    }
    else {
      this.authService.authenticateTeacher(teacher).subscribe(data => {

        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 4000 });
          this.authService.storeTeacherData(data.token, data.teacher);
          console.log("login username",this.username)
          localStorage.setItem('tusername',JSON.stringify(this.username));
          this.router.navigate(['tchatroom']);
        }
        else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 4000 });
          this.router.navigate(['tlogin']);
        }
      });
    }


  }
  onRegister() {

    this.router.navigate(['tregister']);
  }
}
