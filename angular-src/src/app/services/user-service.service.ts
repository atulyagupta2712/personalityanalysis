// import { Injectable } from '@angular/core';
import { HttpModule, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceService {

  constructor(private http: Http) { }
  saveUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/users', user, {headers: headers});
  }

  login(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/login', user, {headers: headers});
  }

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null ? true : false;
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('username'));
  }
  getLoggedInPsychologist() {
    return JSON.parse(localStorage.getItem('tusername'));
  }

  getUsers() {
    return this.http.get('http://localhost:3000/userRoute/allusers');
  }

  getChatRoomsChat(chatRoom) {
    return this.http.get('http://localhost:3000/chatroom/' + chatRoom);
  }
  getPsychologists(){
    return this.http.get('http://localhost:3000/userRoute/psychologist');
  }
}
