import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router'; 
import { UserService } from '../userservice/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class VerificationDocsAvailableGuard implements CanActivate {

	private _isAvailable:boolean = false;
	private _nationalIdAvailable:boolean = false;
	private _medicalLicenseAvailable:boolean = false;
	private _phoneVerified:boolean = false;

	constructor(private userService: UserService,private router: Router) {
		// this.userService.currentUser().subscribe(user => {
		// 	let status = false;
		// 	if(user){
		// 		let vdocs = user.profile.verificationDocs;
				
		// 		if(vdocs){
		// 			var medicalLAvailable = false;
		// 			var idAvailable = false;

		// 			for (let key in vdocs) {
		// 	          if (vdocs[key]['type'] == 'medical_license'){
		// 	          	medicalLAvailable = true;
		// 	          }
		// 	          if(vdocs[key]['type'] == 'national_id'){
		// 	          	idAvailable = true;
		// 	          }

		// 	          if(medicalLAvailable == true && idAvailable == true){
		// 	          	status = true;
		// 	          }
		// 	        }
		// 		}
		// 	}
		// 	this._setIsAvailable(status);
		// });
	}

	private _setIsAvailable(val:boolean){
		this._isAvailable = val;
	}

	private _validateHasDocs(){
		var user = this.userService.getCurrentUserValue();
		var status = false;
		if(user){
			this._phoneVerified = user.profile.personal.phone_verified;
			let vdocs = user.profile.verificationDocs;
			console.log(this._phoneVerified);
			if(vdocs){
				for (let key in vdocs) {
		          if (vdocs[key]['type'] == 'medical_license'){
		          	this._medicalLicenseAvailable = true;
		          }
		          if(vdocs[key]['type'] == 'national_id'){
		          	this._nationalIdAvailable  = true;
		          }

		          if(this._medicalLicenseAvailable == true && this._nationalIdAvailable == true){
		          	status = true;
		          }
		        }
			}

			if(!this._phoneVerified || this._phoneVerified == false){
				status = false;
				this._phoneVerified = false;
			}else{
				this._phoneVerified = true;
			}
		}
		this._setIsAvailable(status);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		console.log(this._isAvailable)
		this._validateHasDocs();
		console.log(this.userService.getCurrentUserValue());
		console.log(this._isAvailable)
		if(this._isAvailable == true){
			return true;
		}else{
			if(this._medicalLicenseAvailable === false){
			   this.router.navigate(['/verify-account/medical-license']);
			}else if(this._nationalIdAvailable === false){
			   this.router.navigate(['/verify-account/national-id']);
			}else if(this._phoneVerified === false){
				this.router.navigate(['/verify-account/phone']);
			}
	    	
	   	 	return false;  
		}
	} 
}
