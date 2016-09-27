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

        //if not found return error and navigate back
        
      }
    });
  }

  openPracticeModal(section:string) {
    this.openPracticeForm = true;
    this.practiceFormSection = section;
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
