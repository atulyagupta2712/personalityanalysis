// import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebSocketServiceService {
  private socket = io('http://localhost:3000');
  constructor() { }
  joinRoom(data) {
    console.log(data);
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    console.log("new msg")
    const observable = new Observable<{ user: String, message: String}>(observer => {
      console.log("observer")
      this.socket.on('new message', (data) => {
        console.log("new message", data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}

