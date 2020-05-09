import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-useranalysis',
  templateUrl: './useranalysis.component.html',
  styleUrls: ['./useranalysis.component.css']
})
export class UserAnalysisComponent implements OnInit {
  psycho:any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ){ 
  }
    ngOnInit(){

      this.authService.getpsychologist().subscribe(data=>{
        console.log("data", data.msg);
        this.psycho = data.msg;
        // for(let i =0; i<data.msg.length; i++){
        
        // }
        // console.log(this.psycho)
      })
    }

    onChat(){
      this.router.navigate(['payment']);
    }

    onLogoutClick(){
      this.authService.onLogout();
      this.flashMessage.show('You have logged out successfully', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
      return false;
    }
}