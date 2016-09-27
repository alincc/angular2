import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from "../../../environment"

declare const FB:any;
@Injectable()
export class FbService {

	private _currentFbUser$: Subject<any> = new BehaviorSubject<any>(null);
  private _isInitiliased$: Subject<boolean> = new BehaviorSubject<boolean>(false);
	constructor() {
    if(typeof FB !== 'undefined'){
   	  FB.init({
          appId      : environment.fbAppId,
          cookie     : false,  // enable cookies to allow the server to access
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.5' // use graph api version 2.5
      });

      FB.getLoginStatus((response) => {
        console.info("Facebook api fully initialised");
        this._isInitiliased$.next(true);
        this.statusChangeCallback(response);
      });
    }
	}

	currentFbUser() {
  	return this._currentFbUser$.asObservable();
	}

  fbSDKInitState() {
    return this._isInitiliased$.asObservable();
  }

  statusChangeCallback = (resp) => {
    
    if (resp.status === 'connected') {
      console.log(resp);
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token 
      // and signed request each expire
      this._currentFbUser$.next(resp.authResponse);
    } else if (resp.status === 'not_authorized') {
      // the user is logged in to Facebook, 
      // but has not authenticated your app
    } else {
      // the user isn't logged in to Facebook.
    }
  }

	login(){
    if(typeof FB !== 'undefined')
	    return FB.login(this.statusChangeCallback);
	}

  logout(){
    if(typeof FB !== 'undefined')
      return FB.logout();
  }

}
