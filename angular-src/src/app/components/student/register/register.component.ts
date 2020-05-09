import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
   onRegister(){
   
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    
    }
    console.log(user.name);

    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Please fill in all the fields", {cssClass: 'alert-danger',  timeout: 4000});
      return false;
    }
    else{
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show("Please type a valid email", {cssClass: 'alert-danger', timeout: 4000})
      }
      else{
        if(!this.validateService.validatePassword(user.password)){
          this.flashMessage.show("Password should have atleast 1 uppercase letter, one number and the length should be greater than 7", {cssClass: 'alert-danger', timeout: 4000});
        }
        else{
          this.authService.registerUser(user).subscribe((data)=>{
    
            if(data.success){
              this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 4000});
              this.router.navigate(['/login']);
          
              
     
            
            }
            else{
              
              this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 4000});
              this.router.navigate(['/register']);
              
            }
          })
        }
      }
  
     
   

    }
 
    

 }
   
 onLogin(){
      this.router.navigate(['login']);
}

}
