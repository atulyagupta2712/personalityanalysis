import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { WebSocketServiceService } from '../../../services/web-socket-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.css']
})
export class TchatComponent implements OnInit {
  private username: String;
  private email: String;
  private chatroom;
  private message: String;
  currentUser: String;
  messageArray: Array<{ user: String, message: String }> = [];
  private isTyping = false;
  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketServiceService,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.webSocketService.newMessageReceived().subscribe(data => {
      console.log("new message recieved" + data);
      this.messageArray.push(data);
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit() {
    console.log("this ", this)
    this.username = this.route.snapshot.queryParams['name'];
    this.email = this.route.snapshot.queryParams['email'];
    const currentUser = this.userService.getLoggedInPsychologist();
    this.currentUser = currentUser;
    console.log("current user" + currentUser)
    if (currentUser < this.username) {

      this.chatroom = currentUser.concat(this.username);
    } else {
      this.chatroom = this.username.concat(currentUser);

    }
    console.log("chatrooom", this.chatroom)
    this.webSocketService.joinRoom({ user: this.userService.getLoggedInPsychologist(), room: this.chatroom });
    this.userService.getChatRoomsChat(this.chatroom).subscribe(messages => {
      if (messages.json())
        this.messageArray = messages.json();
    });
  }

  sendMessage() {
    if (this.message && this.message != "") {
      this.webSocketService.sendMessage({ room: this.chatroom, user: this.userService.getLoggedInPsychologist(), message: this.message });
      document.getElementById("chat-window-sub").scrollIntoView(false);
      this.message = '';
    }
  }

  typing() {
    this.webSocketService.typing({ room: this.chatroom, user: this.userService.getLoggedInUser().username });
  }

}
