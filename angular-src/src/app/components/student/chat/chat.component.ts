// import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../services/user-service.service';
import { WebSocketServiceService } from '../../../services/web-socket-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
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
    console.log("chat component");
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
    const currentUser = this.userService.getLoggedInUser();
    this.currentUser = currentUser;
    console.log(this.username);
    if (currentUser < this.username) {
      // console.log("current user"+ currentUser)
      this.chatroom = currentUser.username.concat(this.username);
    } else {
      this.chatroom = this.username.concat(currentUser);
      console.log("chatroom ", this.chatroom)
    }
    this.webSocketService.joinRoom({ user: this.userService.getLoggedInUser(), room: this.chatroom });
    this.userService.getChatRoomsChat(this.chatroom).subscribe(messages => {
      if (messages.json())
        this.messageArray = messages.json();
    });
  }

  sendMessage() {
    if (this.message && this.message != "") {
      this.webSocketService.sendMessage({ room: this.chatroom, user: this.userService.getLoggedInUser(), message: this.message });
      document.getElementById("chat-window-sub").scrollIntoView(false);
      this.message = '';
    }
  }

  typing() {
    this.webSocketService.typing({ room: this.chatroom, user: this.userService.getLoggedInUser().username });
  }
  finishMessage(){
   prompt("Please rate the psychologist in the range 1 to 5", " ");

   
    
    
  }
}


