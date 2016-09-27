import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router'; 
import { UserService } from '../userservice/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class PersonalInfoAvailableGuard implements CanActivate {

	private _isAvailable:boolean = null;

	constructor(private userService: UserService,private router: Router) {
		this.userService.currentUser().subscribe(user => {
			let status = false;
			if(user){
				let profile = user.profile.personal;
				if(profile){
					if(profile.phone)
						status = true;
				}
			}
			this._setIsAvailable(status);
		});
	}

	private _setIsAvailable(val:boolean){
		this._isAvailable = val;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

		if(this._isAvailable === true){
			return true;
		}else{
			// Navigate to the update profile page
	    	this.router.navigate(['/verify-account/medical-license']);
	   	 	return false;  
		}

	} 
}
