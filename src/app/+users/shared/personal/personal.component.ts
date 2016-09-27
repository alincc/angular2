import {
  Component,
  OnInit,
} from '@angular/core';

import {
  Router
}  from '@angular/router';

import {
  Location
} from '@angular/common';

import {
  UsersService,
  UserInterface
} from '../../shared';

import {
  ChPopover
} from '../../../shared/utility_components';

import {Http} from '@angular/http';
import {Observable,BehaviorSubject} from 'rxjs/Rx';

import {
    Validators,
    FormBuilder,
    FormControl,
    FormGroup
} from "@angular/forms";
import {UserService} from "../../../shared/userservice/user.service";
import {DoctorService} from "../../../shared/doctor/doctor.service";

declare var _:any;

@Component({

  selector: 'ch-personal',
  templateUrl: './personal.component.html',
  styles: [
  	require('./personal.component.scss')
  ],
  entryComponents: [
    ChPopover
  ],
  providers: [

  ]
})

export class PersonalComponent implements OnInit {
    private _currentUser:UserInterface;
    personalDetails:any = {first_name:'',last_name:'',email:'',name:'',speciality:[],bio:'',thumbnail:'',phone:''};
    registrationForm: FormGroup;
    serverErrorMessage:any;
    submissionInprogress:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    isInDashboard:boolean = false;
    placement: string = 'bottom';
    open = false;
    constructor(
      public http: Http,
      private router: Router,
      private usersService: UsersService,
      private fb: FormBuilder,
      private userService: UserService,
      private doctorService: DoctorService,
      private location: Location
    ) {

      this.userService.currentUser().subscribe(user => {
        this._currentUser = user;
        if(this._currentUser.profile.personal){
          this.personalDetails = this._currentUser.profile.personal;
          console.log(this.personalDetails);
        }
      });
      this._buildForm();
    }

    private _buildForm(){
      this.personalDetails.gender = this.personalDetails.gender ? this.personalDetails.gender : '',

      this.registrationForm = this.fb.group({
        'first_name': [
          this.personalDetails.first_name,
          Validators.required
        ],
        'last_name': [
          this.personalDetails.last_name,
          Validators.required
        ],
        'name': [
          this.personalDetails.first_name+' '+this.personalDetails.last_name,
          Validators.required
        ],
        'phone': [
          this.personalDetails.phone,
          Validators.required
        ],
        'bio':[
          this.personalDetails.bio
        ],
        'speciality': [
          this.personalDetails.speciality,
          Validators.required
        ],
        'username': [
          this.personalDetails.username,
          Validators.required
        ],
        'gender': [
          this.personalDetails.gender,
          Validators.required
        ],
        'thumbnail': [
          this.personalDetails.thumbnail
        ]
      });

      //Register change  listeners
      this.registrationForm.controls['thumbnail'].valueChanges.subscribe(newValue => {
        this.updateAvatar(newValue);
      });

      this.registrationForm.controls['speciality'].valueChanges.subscribe(newValue => {
        this.updateSpeciality(newValue);
      });

    }

    private _setIsInDashboard(){
      let path = this.location.path();
      if(/dashboard/i.test(path)){
        this.isInDashboard = true;
      }
    }

    onSubmit(data) {
      this.submissionInprogress.next(true);
      //Add this user to doctors list and update the data that is specific to the doctor's collection
      //i.e bio and speciality
      //Get the data that is centric to doctor and update his record
      let doctorsData =  {
        'bio': data.bio,
        'speciality': data.speciality
      };

      //Make sure name isn't submitted
      delete data['name'];

      Observable.forkJoin(
        this.usersService.updateUser('me',data),
        this.doctorService.add(doctorsData)
      ).subscribe(
        res => {
          //This resolves to two data sets for each call. The first being user's update
          //We pick that and feed it to the user session
          let response: any = res[0];
          let doctorResponse = res[1];
          response.doctor = {"data": doctorResponse};
          this.userService.setPersonalRecord(response);
          this.submissionInprogress.next(false);
        },
        err => {
          console.info(err);
          console.log("err");
          this.submissionInprogress.next(false);
        }
      );

    }



    onChanges(event) {
      //Detect change on thumbnail. If it changes then update user's avatar right away on the backend.
      //This prevents redundant avatars on aws
      console.log(event);
    }

    ngOnInit() {

      this._setIsInDashboard();

    }

    updateName(){
      if(this.registrationForm.value.name){
        let names = this.registrationForm.value.name.split(" ");
        if(names.length > 0){
          (<FormControl>this.registrationForm.controls['first_name']).setValue(names[0],
            {
              onlySelf: false,
              emitEvent: false,
              emitModelToViewChange: false,
              emitViewToModelChange: false
            }
          );
          delete names[0];
          let lastName = names.join(' ');
          console.log(lastName);
          (<FormControl>this.registrationForm.controls['last_name']).setValue(lastName,
            {
              onlySelf: false,
              emitEvent: false,
              emitModelToViewChange: false,
              emitViewToModelChange: false
            }
          );

          this.onSubmit(this.registrationForm.value);
        }
      }
    }

    updateBio(){
      //Check if form data is same as for the session if not save changes
      if(this._currentUser.profile.personal){
        let personalDetails = this._currentUser.profile.personal;
        if(personalDetails.bio != this.registrationForm.value.bio){
          //check if delete. And request confirmation for removing completely
          this.onSubmit(this.registrationForm.value);
        }
      }
    }

    updateUsername(){
      //Check if form data is same as for the session if not save changes
      if(this._currentUser.profile.personal){
        let personalDetails = this._currentUser.profile.personal;
        if(personalDetails.username != this.registrationForm.value.username){
          //check if delete. And request confirmation for removing completely
          this.onSubmit(this.registrationForm.value);
        }
      }
    }

    updateGender(value){
      console.log(value);
      (<FormControl>this.registrationForm.controls['gender']).patchValue(value);
      if(this._currentUser.profile.personal){
        let personalDetails = this._currentUser.profile.personal;
        if(personalDetails.gender != this.registrationForm.value.gender){
          //check if delete. And request confirmation for removing completely
          this.onSubmit(this.registrationForm.value);
        }
      }
    }

    updateSpeciality(value){
      if(value){
        this.onSubmit(this.registrationForm.value);
      }
    }

    updateAvatar(value){
      if(value){
        (<FormControl>this.registrationForm.controls['thumbnail']).setValue(value,
          {
            onlySelf: false,
            emitEvent: false,
            emitModelToViewChange: false,
            emitViewToModelChange: false
          }
        );
        if(this._currentUser.profile.personal){
          let personalDetails = this._currentUser.profile.personal;
          if(personalDetails.thumbnail != this.registrationForm.value.thumbnail && this.registrationForm.value.thumbnail != ''){
            //check if delete. And request confirmation for removing completely
            this.onSubmit(this.registrationForm.value);
          }
        }
      }
    }

    canDeactivate(): Observable<boolean> | boolean {
      //Check if submission is in progress
      let submissionState = this.submissionInprogress.getValue();
      if(submissionState == true){
        return false;
      }

      let formValues = _.values(this.registrationForm.value).filter((e)=>!!e);

      if(formValues.length === 0){
        return true;
      }else{
        //Show status a sweet alert message to confirm navigation
        // let p = window.confirm("Discard changes?");
        // return p;
        return true;
      }
    }


}
