import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: any;
  score: any;
 
  constructor(
    private router: Router,
    private authService : AuthService
  ) { }

  ngOnInit() {
    
  
  }

  again(){
    this.router.navigate(['dashboard']);
    localStorage.removeItem('score');
    localStorage.removeItem('length');
  }

  onlogout(){
    this.authService.onLogout();
    alert('You are logged out');
    this.router.navigate(['/']);
    return false;
  }
  onstress(){
    this.router.navigate(['userstress'])
  }

}
