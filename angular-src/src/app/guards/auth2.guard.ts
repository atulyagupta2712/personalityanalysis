import { Injectable } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { Router, CanActivate } from '@angular/router';

 @Injectable()

export class AuthGuard2 implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router
    ){

    }
    canActivate(){
        if(this.authService.loggedIn()){
            return true;
        }
        else{
            this.router.navigate(['tlogin']);
            return false;
        }
    }
}