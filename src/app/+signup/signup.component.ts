import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

// Lodash namespace
declare var _:any;

import {
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';
import {
    AuthService,
} from '../shared'


@Component({

  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styles: [
    require('./signup.component.scss')
  ]
})
export class SignupComponent implements OnInit{
    signupForm: FormGroup;
    serverErrorMessage:any;
    submissionInprogress:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    constructor(private router: Router,private authService: AuthService,private fb: FormBuilder) {


    }

    _buildForm(){

      this.signupForm = this.fb.group({
        'first_name': ['',Validators.required],
        'last_name': ['',Validators.required],
        'email': ['',Validators.required],
        'password': ['',Validators.required]
      });
    }

    ngOnInit() {
      if (!this.signupForm) {
        this._buildForm();
      }
    }

    onSubmit(data) {
      if(this.signupForm.valid){
        this.submissionInprogress.next(true);
        this.authService.signup('signup',data).then((data) => {
          this.submissionInprogress.next(false);
          //Set the user's data
          //Reset form
          this._buildForm();
          this.router.navigate(['/dashboard']);

        }).catch(res => {
          this.submissionInprogress.next(false);
          let body = res.json();
          this.serverErrorMessage = body.error.message;
          if(this.serverErrorMessage instanceof Array){
            //TODO
            if(body.status_code == 422){
              //Attach this error to formControl
            }
            //Concat all the messages into one body
            this.serverErrorMessage = "Something went wrong try again";
          }
        });
      }
    }

    canDeactivate(): Observable<boolean> | boolean {
        //Check if submission is in progress
        let submissionState = this.submissionInprogress.getValue();
        if(submissionState == true){
          return false;
        }

        let formValues = _.values(this.signupForm.value).filter((e)=>!!e);

        if(formValues.length === 0){
          return true;
        }else{
          //Show status a sweet alert message to confirm navigation
          let p = window.confirm("Discard changes?");
          return p;
        }
    }

}
