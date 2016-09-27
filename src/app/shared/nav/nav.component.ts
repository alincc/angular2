import { Component, OnInit } from '@angular/core';
// import { MdToolbar } from '@angular2-material/toolbar';
import { Router} from '@angular/router';
import { UserService } from '../userservice/user.service';
import { AuthService } from '../authservice/auth.service';

@Component({

  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styles: [
  	require('./nav.component.scss')
  ],
})

export class NavComponent implements OnInit {

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
