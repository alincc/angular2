import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import {
  Location
} from '@angular/common';

import {
  Router,
  ActivatedRoute,
  Params
}from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  Observable,BehaviorSubject
} from 'rxjs';

import {
  PracticeService,
  practiceInterface
} from '../shared';

import {
  LocationInterface,
  UserService
} from '../../shared';

import 'lodash';
// Lodash namespace
declare var _:any;

@Component({

  selector: 'ch-practice',
  templateUrl: './practice.component.html',
  styles: [
  	require('./practice.component.scss')
  ],
  entryComponents: [

  ]
})
export class PracticeComponent implements OnInit {
  openPracticeForm: boolean = false;
  practice:practiceInterface = null;
  practiceFormSection:string;
  private _practiceId:number;
  //Have practice as an observable to allow tracking of the current practice data by the form component
  practice$:BehaviorSubject<practiceInterface> = new BehaviorSubject<practiceInterface>(null);

  constructor(
    private router: Router,
     private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private practiceService: PracticeService,
    private location: Location
  ) {
  }


  ngOnInit() {
    this.route.params.forEach((params: Params) => {
     this._practiceId = +params['id'];
    });
    //Get this practice data from the session
    this.userService.currentUser().subscribe(user => {
      if(user && user.profile.practices){
        let practices = user.profile.practices;
        //Set the current practice
        var matchIndex = null;
        _.filter(practices, (pra,index) => {

          if(pra.id === this._practiceId){
            matchIndex = index;
            return true;
          }
          return false;
        });
        this.practice = practices[matchIndex];
        console.log(this.practice);
      }
    });
  }

  openPracticeModal(section:string) {
    this.openPracticeForm = true;
    this.practiceFormSection = section;
  }

  updateLogo($event){
    this.practice.logo = $event;
    this.practice$.next(this.practice);
    console.log($event);
  }

  updateServices($event){
    this.practice.services = $event;
    this.practice$.next(this.practice);
    console.log($event);
  }

  updatePhotos($event){
    console.log($event);
    this.practice.photos = $event;
    this.practice$.next(this.practice);
  }
  

  canDeactivate(): Observable<boolean> | boolean {
    return true;
  }

  onFormClose($event){
    if($event === true){
      this.openPracticeForm = false;
    }
  }

  goBack(): void {
    window.history.back();
  }

}
