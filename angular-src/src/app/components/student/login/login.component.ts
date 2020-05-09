import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) {
  }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user = {
      username: this.username, 
      password: this.password
    };
    if(!this.validateService.validateLogin(user)){
      this.flashMessage.show("Please fill in all the fields", {cssClass: 'alert-danger',  timeout: 4000});
    }
    else{
      this.authService.authenticateUser(user).subscribe(data=>{
  
        if(data.success){
         
          localStorage.setItem('username',JSON.stringify(this.username));
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 4000});
          this.authService.storeUserData(data.token, data.user);
         // this.router.navigate(['dashboard']);
         this.router.navigate(['dashboard']);
        }
        else{
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 4000});
          this.router.navigate(['login']);
        }
      });
    }

    // console.log(this.username);
  }
  onRegister(){
    this.router.navigate(['register']);
  }
}
