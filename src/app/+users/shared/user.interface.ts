import { AccessTokenInterface } from '../../shared';
import {practiceInterface} from '../../+practices';
import {degreeInterface} from './education';
//type authProviderOptions = "facebook" | "google" | "custom";
export interface UserInterface{
  	isLoggedIn: boolean,
  	authProvider?:string,
  	accessToken?:AccessTokenInterface,
  	profile:{
	  	personal?:{
	  		name:string,
	  		email: string,
	  		thumbnail?: string,
	  		first_name?: string,
	  		last_name?: string,
	  		middle_name?: string,
	  		speciality?:string[],
	  		bio?:string,
	  		phone?: string,
	  		phone_verified: boolean,
	  		gender?: string,
	  		username?: string
	  	},
	  	education?:[degreeInterface],
	  	verificationDocs?:{
	  		national_id:{
	  			id:number,
	  			url:string,
	  			verificationStatus?:string
	  		},
	  		medical_license:{
	  			id:number,
	  			url:string,
	  			verificationStatus?:string
	  		}
	  	},
	  	practices?:[practiceInterface]
	}
}
