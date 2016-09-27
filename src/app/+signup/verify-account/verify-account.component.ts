import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  VerifyAccountStepsService,stepInterface
} from './shared/verifyAccountSteps.service';

import {
  AuthService,
} from './../../shared';

@Component({

  selector: 'verify-account',
  templateUrl: './verify-account.component.html',
  styles: [
    require('./verify-account.component.scss')
  ],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyAccountComponent implements OnInit {

  currentStep:stepInterface;
  hasPrevious:boolean = false;

  constructor(
    private verifyAccountStepsService: VerifyAccountStepsService,
    private authService: AuthService,
    private router:Router) {
    console.log("Session started");
    this.startUpdateSession();
  }

  ngOnInit() {
    
  }

  startUpdateSession(){
    this.verifyAccountStepsService.start(
    {
      name:'medicallicense',
      position:1,
      url:'/verify-account/medical-license',
      isReady: false,
      nextUrl:'/verify-account/national-id'
    },
    {
      name:'phone',
      position:3,
      isReady: false,
      url:'/verify-account/phone',
      prevUrl: '/verify-account/national-id',
      nextUrl: '/dashboard'
    });


    this.verifyAccountStepsService.getCurrentStep().subscribe(res => {
      if(res){
        this.currentStep = res;
        let position = res.position;
        if(position > 1){
          this.hasPrevious = true;
        }else{
          this.hasPrevious = false;
        }
      }
    });

  }

  logout(){

    this.authService.logout().then(data => {
      console.log("logout out");
       this.router.navigateByUrl('/login');
    });
  }

  prev(){
    //update that we are about to go back to allow the respective route not to apply the guard
    this.activateGoingBack();
    setTimeout(() => {
      this.router.navigateByUrl(this.currentStep.prevUrl);
    });
  }

  activateGoingBack(){
    this.currentStep.goingBack = true;
    this.verifyAccountStepsService.setCurrentStep(this.currentStep);
  }

  next(){

    // if(this.currentStep){

    //   if(this.currentStep.isReady == true)
    //     this.router.navigateByUrl(this.currentStep.nextUrl);
    // }
  }

  isActive(step: string){
    if(this.currentStep){
      return step === this.currentStep.name;
    }else{
      return false;
    }
  }

  isCompleted(position: number){
    return this.verifyAccountStepsService.isCompleted(position);
  }

}
