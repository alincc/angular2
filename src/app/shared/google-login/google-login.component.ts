import { Component, Input } from '@angular/core';
import { GoogleService } from './shared';

@Component({

  selector: 'google-login',
  templateUrl: 'google-login.component.html',
  styles: [
  	require('./google-login.component.scss')
  ],
  providers: [

  ]
})

export class GoogleLoginComponent {
  googleLoginButtonId = "google-login-button";
  @Input()
  text:string = "Sign in with Gmail";

  constructor(private googleService: GoogleService) {
  }


  // Angular hook that allows for interaction with elements inserted by the
  // rendering of a view.
  ngAfterViewInit() {
    this.googleService.currentGoAuth().subscribe(auth => {
      if(auth){
        auth.attachClickHandler(
          document.getElementById(this.googleLoginButtonId),
          {},
          this.onGoogleLoginSuccess,
          this.onGoogleLoginFailure
        );
      }
    });
  }

  // Triggered after a user successfully logs in using the Google external
  // Preserve this context
  onGoogleLoginSuccess = (loggedInUser) => {
    this.googleService.setCurrentUser(loggedInUser);
  }

  onGoogleLoginFailure = (loggedInUser) => {
    console.log(loggedInUser);
    console.log("an error occurred while authnticating");
  }
}
