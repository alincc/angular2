import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router'; 
import { AuthService } from '../authservice/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {
	constructor(private authService: AuthService,private router: Router) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(this.authService.isLoggedIn()) { 
			return true; 
		}
	    // Store the attempted URL for redirecting
	    this.authService.redirectUrl = state.url;
	    console.log(state.url);

	    // Navigate to the login page
	    this.router.navigate(['/login']);
	    return false;  	
	} 
}
