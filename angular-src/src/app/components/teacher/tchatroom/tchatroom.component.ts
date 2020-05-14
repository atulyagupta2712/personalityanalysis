import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../../../services/user-service.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tchatroom',
  templateUrl: './tchatroom.component.html',
  styleUrls: ['./tchatroom.component.css']
})
export class TchatroomComponent implements OnInit {
Users;
  constructor(private userService: UserServiceService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      console.log(users.json().msg)
      this.Users = users.json().msg;
    });
  }

  getUser() {
    return this.userService.getLoggedInPsychologist();
  }

  onLogoutClick() {
    this.authService.onLogout();
    this.flashMessage.show('You have logged out successfully', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/']);
    return false;
  }

}
