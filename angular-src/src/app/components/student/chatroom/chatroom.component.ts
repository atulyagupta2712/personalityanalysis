import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../../../services/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  Users;
  details
  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getPsychologists().subscribe(users => {
      console.log(users.json().msg)
      this.Users = users.json().msg;
    });
  }

  getUser() {
    return this.userService.getLoggedInUser();
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
