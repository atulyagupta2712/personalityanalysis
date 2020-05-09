import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
// import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  teacher: any;

  constructor(private http: Http) { }
  registerUser(user){
   
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post('http://localhost:3000/userRoute/register', user, {headers: header})
   .map(res=>{
    return res.json();
    })
  }
  authenticateUser(user){
    let header = new Headers();
    header.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/userRoute/authenticate', user,{headers: header}).map(response=>{
      // console.log(response.json());
      return response.json();
      
    })
  }


  loggedIn(){
    return tokenNotExpired('id_token');
  }
  storeUserData(token,user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  storeTeacherData(token,teacher){
    localStorage.setItem('id_token', token);
    localStorage.setItem('teacher', JSON.stringify(teacher));
    this.authToken = token;
    this.teacher = teacher;
  }

  onLogout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  registerTeacher(teacher){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post('http://localhost:3000/teacherRoute/register',teacher,{headers:header}).map(response=>{
      return response.json();
    })
  }

  authenticateTeacher(teacher){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post('http://localhost:3000/teacherRoute/login', teacher, {headers: header}).map(response=>{
      return response.json();
    })
  }
 
  addAlgoQuestion(question){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post('http://localhost:3000/teacherRoute/algoques', question, {headers:header}).map(response=>{
      return response.json();
    })

  }

  addpsychologist(question){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post('http://localhost:3000/teacherRoute/psychologist', question, {headers:header}).map(response=>{
      return response.json();
    })

  }

  addSoftwareQuestion(question){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post('http://localhost:3000/teacherRoute/softwareques',question,{headers:header}).map(response=>{
      return response.json();
    })
  }

  addJavaQuestion(question){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post('http://localhost:3000/teacherRoute/javaques',question,{headers:header}).map(response=>{
      return response.json();
    })
  }

  addStressQuestion(question){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post('http://localhost:3000/teacherRoute/stressques',question,{headers:header}).map(response=>{
      return response.json();
    })
  }
  getStressQuestion(){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.get('http://localhost:3000/userRoute/stress', {headers:header}).map(response=>{
      return response.json();
    })
  }
  getAlgoQuestion(){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.get('http://localhost:3000/userRoute/algo', {headers:header}).map(response=>{
      return response.json();
    })
  }

  getJavaQuestion(){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.get('http://localhost:3000/userRoute/java', {headers:header}).map(response=>{
      return response.json();
    })
  }
  getSoftwareQuestion(){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.get('http://localhost:3000/userRoute/software', {headers:header}).map(response=>{
      return response.json();
    })
  }
  getpsychologist(){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.get('http://localhost:3000/userRoute/psychologistanalyse', {headers:header}).map(response=>{
      return response.json();
    })
  }
}

