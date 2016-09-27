import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  Location
} from '@angular/common';

import {
  Router
}from '@angular/router';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';


import {
  ModalComponent,
  SubmitButton
} from '../../../shared/utility_components';

import {
  UserService
} from '../../../shared';

import {
  EducationService
} from './education.service';

import 'lodash';
// Lodash namespace
declare var _:any;

@Component({

  selector: 'ch-education',
  templateUrl: './education.component.html',
  styles: [
  	require('./education.component.scss')
  ]
})
export class EducationComponent implements OnInit {
  educationAdditionForm: FormGroup;
  submissionInprogress:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  submissionInprogress2:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  serverErrorMessage:any;
  educationHistory:degreeInterface[] = [];
  selectedDegree:degreeInterface = null;
  modalOpen: boolean = false;
  isInDashboard:boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private educationService: EducationService,
    private userService: UserService,
    private location: Location
  ) {
  }

  private _setIsInDashboard(){
    let path = this.location.path();
    if(/dashboard/i.test(path)){
      this.isInDashboard = true;
    }
  }

  private _buildForm(degree?:degreeInterface){
    if(!degree){
       degree = {
        school_id:'',start_year:'',end_year:'',degree:'',area_of_study:'',description:'',
        school:{ 
          data: {
            name:''
          }
        }
      }
    }

    this.educationAdditionForm = this.fb.group({
      'id': [
        degree.id,
      ],
      'school_id': [
        degree.school.data.name,
        Validators.required
      ],
      'start_year': [
        degree.start_year,
        Validators.compose([
          Validators.required,
          Validators.pattern('^(19|20)[0-9]{2}')
        ])
      ],
      'end_year': [
        degree.end_year,
        Validators.compose([
          Validators.required,
          Validators.pattern('^(19|20)[0-9]{2}')
        ])
      ],
      'degree': [
        degree.degree,
        Validators.required
      ],
      'area_of_study': [
        degree.area_of_study,
      ],
      'description': [
        degree.description,
      ]
    });
  }

  ngOnInit() {
    if (!this.educationAdditionForm) {
      this._buildForm();
    }
    this.userService.currentUser().subscribe(user => {
      if(user && user.profile.education){
        this.educationHistory = user.profile.education;
      }
    });
    this._setIsInDashboard();
  }

  saveAddMore(){
    this.onSubmit(this.educationAdditionForm.value);
  }

  onSubmit(data:degreeInterface,close?:boolean) {
    if(this.educationAdditionForm.valid){
      this._saveData(data,close);
    }
  }

  private _addEducationToSession(education: degreeInterface){
    //Replace the degree that matches the selected(Search by id) and clear selected
    var matchIndex = null;
    _.filter(this.educationHistory, (edu,index) => {

      if(edu.id === education.id){
        matchIndex = index;
        return true;
      }
      return false;
    });

    if(matchIndex !== null){
      this.educationHistory[matchIndex] = education;
    }else{
      this.educationHistory.push(education);
    }
    this.userService.setUserEducation(this.educationHistory);
  }

  private _saveData(data,close?:boolean){
    if(close == true){
      this.submissionInprogress2.next(true);
    }else{
      this.submissionInprogress.next(true);
    }

    var submissionMethod = null
    if(data.id){
      submissionMethod = this.educationService.update(data.id,data);
    }else{
      submissionMethod = this.educationService.add(data);
    }

    submissionMethod.then((res) => {
      console.log(res);
      this.submissionInprogress.next(false);
      this.submissionInprogress2.next(false);
      //Update user's education history;
      this._addEducationToSession(res);
      //reset form
      this._buildForm();
      if(close === true){
        this.cancel();
      }
    }).catch(error => {
      this.submissionInprogress.next(false);
      this.submissionInprogress2.next(false);
      let body = error.json();
      this.serverErrorMessage = body.error.message;
      if(this.serverErrorMessage instanceof Array){
        //TODO
        if(body.status_code == 422){
          //Attach this error to formControl
        }
        //Concat all the messages into one body
        this.serverErrorMessage = "Something went wrong, Try Again";
      }

    });
  }

  openEducationModal(size: string,degree?:degreeInterface) {
    this.selectedDegree = degree ? degree : undefined;
    this.modalOpen = true;
    this._buildForm(this.selectedDegree);
  }

  editEducation(degree: degreeInterface){
    this.openEducationModal('',degree);
  }

  deleteEducation(id:number){
    console.log(id);
    let confirmation = confirm("Are you sure you want to delete. This action is irreversible");
    if(confirmation === true){
      this.educationService.delete(id).then(res =>{
        _.remove(this.educationHistory, (val) => {
          return id == val.id;
        });
        //save to settion the changes
        this.userService.setUserEducation(this.educationHistory);
      },error => {

      });
    }
  }

  cancel() {
    this.modalOpen = false;
    this.submissionInprogress.next(false);
    this.submissionInprogress2.next(false);
  }

  saveAndClose(){
    this.onSubmit(this.educationAdditionForm.value,true);
  }

  canDeactivate(): Observable<boolean> | boolean {
    //Check if submission is in progress
    let submissionState = this.submissionInprogress.getValue();
    if(submissionState == true){
      return false;
    }

    let formValues = _.values(this.educationAdditionForm.value).filter((e)=>!!e);

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
/*
*
*
* Verification document validator
* a verification document must atleast have a number
*
*/
export function eduDatesValidator(c: FormControl):
{
  [s: string]: boolean
} {

  if(!c.value || c.value == ""){

    return { yearValid : true};
  }else{
    console.log("valid")
    return null;
  }
}

export interface degreeInterface{
  id?:any,
  school_id:string,
  start_year:string,
  end_year:string,
  degree:string,
  area_of_study?:string,
  description?:string,
  school?:any
}
