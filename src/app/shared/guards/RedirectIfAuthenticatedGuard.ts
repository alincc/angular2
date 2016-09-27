import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router'; 
import { AuthService } from '../authservice/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class RedirectIfAuthenticatedGuard implements CanActivate {
	constructor(private authService: AuthService,private router: Router) {

	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(this.authService.isLoggedIn()) { 
			console.log("guard called.. Navigating")
			this.router.navigate(['/dashboard']);
			return false;
		}
	    return true;  	
	} 
}
