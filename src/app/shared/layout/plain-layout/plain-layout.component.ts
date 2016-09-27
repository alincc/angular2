import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {
  Router,
}  from '@angular/router';

import { UserService } from '../../userservice/user.service';
import { AuthService } from '../../authservice/auth.service';


@Component({

  selector: 'ch-plain-layout',
  templateUrl: './plain-layout.component.html',
  styles: [
  	require('./plain-layout.component.scss')
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PlainLayoutComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ){

  }

  isLogged:boolean = false;

  ngOnInit(){
    this.userService.currentUser().subscribe((user) => {
      this.isLogged = user.isLoggedIn;
    },error => {
        console.log(error);
    });
  }

  logout(){
    this.authService.logout().then(data => {
       this.router.navigate(['/login']);
    });
  }
}
