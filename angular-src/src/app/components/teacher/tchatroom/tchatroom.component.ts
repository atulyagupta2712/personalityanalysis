import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../../../services/user-service.service';
@Component({
  selector: 'app-tchatroom',
  templateUrl: './tchatroom.component.html',
  styleUrls: ['./tchatroom.component.css']
})
export class TchatroomComponent implements OnInit {
Users;
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      console.log(users.json().msg)
      this.Users = users.json().msg;
    });
  }

  getUser() {
    return this.userService.getLoggedInPsychologist();
  }

}
