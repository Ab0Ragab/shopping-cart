import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {
  isLoginMode = true;
  isLoding = false;
  error:string = null;
  constructor(private authService: AuthService, private router: Router) { }

  onSwithMode(){
    this.isLoginMode =!this.isLoginMode;
  }

  onSumbit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoding = true;

    if(this.isLoginMode){
     authObs = this.authService.logIn(email, password);
     this.error = null;
    } else {
     authObs = this.authService.signUp(email, password);
     this.error = null;  
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoding = false;
      this.router.navigate(['/']);
    },errorMessage => {
       console.log(errorMessage);
       this.error = errorMessage;
       this.isLoding = false;
    });
    
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }
}
