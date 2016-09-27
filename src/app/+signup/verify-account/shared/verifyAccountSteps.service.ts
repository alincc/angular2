import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable()
export class VerifyAccountStepsService {
  private _currentStep$: BehaviorSubject<stepInterface> = new BehaviorSubject<stepInterface>(null);
  private _startStep: stepInterface;
  private _finalStep: stepInterface;

  constructor() {
    
  }

  getCurrentStep(){
    return this._currentStep$.asObservable();
  }

  setStartStep(step: stepInterface){
    this._startStep = step;
  }

  setCurrentStep(step:stepInterface){
    this._currentStep$.next(step);
  }

  setFinalStep(step: stepInterface){
    this._finalStep = step;
  }

  start(startStep:stepInterface,finalStep:stepInterface){
    this.setFinalStep(finalStep);
    this.setStartStep(startStep);
    this.setCurrentStep(startStep);
  }

  isCompleted(position:number){
    //Compare against the current position and the passed in route position
    let currentPos = this._currentStep$.getValue();
    if(currentPos){
      if(currentPos.position > position){
        return true;
      }else{
        return false;
      }
    }
  }


  finish(){
    //Redirect to inside the dashboard
    this.setCurrentStep(null);
    this.setFinalStep(null);
    this.setStartStep(null);
  }

}

export interface stepInterface{
  url: string,
  position:number,
  name:string,
  prevUrl?: string,
  nextUrl?: string,
  isReady: boolean,
  goingBack?: boolean
}
