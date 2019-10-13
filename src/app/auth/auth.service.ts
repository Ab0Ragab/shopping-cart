import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user = new BehaviorSubject<User>(null);
tokenExpiratiomTimer: any;
  constructor(private http: HttpClient) {}

signUp(email: string, password: string): any{
  return this.http.post<AuthResponseData>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEvvSSO6vUcuXKsphbglnRjU5E3z_lOlg',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  )
   .pipe(catchError(this.handleError), 
    tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
   })
   );
  }

  logIn(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEvvSSO6vUcuXKsphbglnRjU5E3z_lOlg',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ) .pipe(catchError(this.handleError),
      tap(resData => {
       this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
     })
    ); 
    }

    autoLogin(){
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: Date
      } = JSON.parse(localStorage.getItem('userData'));
      if(!userData){
        return;
      }

      const loadUser = new User(
        userData.email, 
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if(loadUser.token){
        this.user.next(loadUser);
        const experationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(experationDuration);
      }
    }

    logOut(){
      this.user.next(null);
      localStorage.removeItem('userData');
      if(this.tokenExpiratiomTimer){
        clearTimeout(this.tokenExpiratiomTimer);
      }
      this.tokenExpiratiomTimer = null;
    }

    autoLogout(experationDuration: number){
      this.tokenExpiratiomTimer = setTimeout(() => {
        this.logOut();
      }, experationDuration);
    }

    private handleAuth(email: string,userId: string, token: string, expiresIn: number){
      const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
      let errorMessage = "An unknown error occurred!";
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS': 
          errorMessage = 'This email exist already.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email not exist.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is wrong.';
          break;     
      }
      return throwError(errorMessage);
    }
}
