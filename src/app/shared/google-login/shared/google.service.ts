import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environment';

// Google's login API namespace
declare var gapi:any;

@Injectable()
export class GoogleService {

 	private _currentGoUser$: Subject<any> = new BehaviorSubject<any>(null);
 	private _googleAuth2$: Subject<any> = new BehaviorSubject<any>(null);
	oauth:any;

  	constructor() {
  		if(typeof gapi !== 'undefined')
	  		gapi.load('auth2',
		      () => {
		        // Retrieve the singleton for the GoogleAuth library and set up the client.
		        gapi.auth2.init({
		          client_id: environment.googleClientId,
		          cookiepolicy: 'single_host_origin',
		          // Request scopes in addition to 'profile' and 'email'
		          //scope: 'additional_scope'
		        }).then(auth2 => {
		          //Check if user is authenticated
		          if(auth2.isSignedIn.get() === true){
		          	this.setCurrentUser(auth2.currentUser.get());
		          }
		          this.oauth = auth2;

		          this._googleAuth2$.next(auth2);
		        });
		      }
		    );
  	}

  	signOut(){
	    if(this.oauth)
	      this.oauth.signOut();
	}

  	currentGoUser() {
    	return this._currentGoUser$.asObservable();
 	}

 	setCurrentUser(user){
 		this._currentGoUser$.next(user);
 	}

 	currentGoAuth() {
    	return this._googleAuth2$.asObservable();
 	}

}
