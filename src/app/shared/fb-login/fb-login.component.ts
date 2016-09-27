import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FbService } from "./shared";



@Component({

  	selector: 'fb-login',
  	templateUrl: 'fb-login.component.html',
  	styles: [
   		require('./fb-login.component.scss')
  	],
    providers: []
})

export class FbLoginComponent {
  @Input()
  text:string = "Sign in with Facebook";
  isInitialised:boolean = false;
  constructor(private fbService: FbService) {

    this.fbService.fbSDKInitState().subscribe(res => {
      this.isInitialised = res;
    });
  }

  onFacebookLoginClick() {

    this.fbService.login();
  }
}
