import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
isAuthenticated = false;  
private userSub: Subscription;
  constructor(public cartService: CartService, private authService: AuthService) { 

  }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
     // this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  onLogOut(){
    this.authService.logOut();
  }
}
