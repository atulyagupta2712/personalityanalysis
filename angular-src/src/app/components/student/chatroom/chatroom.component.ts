import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../../../services/user-service.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  Users;
  details
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.getPsychologists().subscribe(users => {
      console.log(users.json().msg)
      this.Users = users.json().msg;
    });
  }

  getUser() {
    return this.userService.getLoggedInUser();
  }
  // onclick(e){
  //   this.details =e.email;
  // }

}
