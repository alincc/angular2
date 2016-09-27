import { Component, OnInit } from '@angular/core';
import 'lodash';
import {
    AuthService,
} from '../shared';

import {
    Router
}  from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';


// Lodash namespace
declare var _:any;

@Component({

  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [
  	require('./login.component.scss')
  ],
})
export class LoginComponent implements OnInit{
    loginForm: FormGroup;
    serverErrorMessage:any;
    submissionInprogress:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  	constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

  	}

    _buildForm(){

        this.loginForm = this.fb.group({
            'username': ['',Validators.required],
            'password': ['', Validators.required]
        });
    }

	private onLoginSuccess(){
        //Reset form
        this._buildForm();
        this.submissionInprogress.next(false);
    	this.router.navigate(['/dashboard']);
    }

    private onLoginFailure(data){
        let body = data.json();
        this.serverErrorMessage = body.error.message;
        this.submissionInprogress.next(false);

    }

    ngOnInit() {
        //Reset form
        this._buildForm();
	}

    onSubmit(data) {
        if(this.loginForm.valid){
            this.submissionInprogress.next(true);
            this.authService.login('login','custom',data).then((data) => {
                this.onLoginSuccess();
            }).catch(error => {
            	this.onLoginFailure(error);
            });
        }
    }

    onFacebookLogin(data){
    	data.oauth_type = 'facebook';
    	this.authService.signup('social/login',data).then((data) => {
            this.onLoginSuccess();
        }).catch(error => {
        	this.onLoginFailure(error);
        });
    }

    onGoogleLogin(data){
    	data.oauth_type = 'googleplus';
    	this.authService.signup('social/login',data).then((data) => {
            this.onLoginSuccess();
        }).catch(error => {
        	this.onLoginFailure(error);
        });
    }


    onLoginFormChanges(){

    }

    canDeactivate(): Observable<boolean> | boolean {
        let formValues = _.values(this.loginForm.value).filter((e)=>!!e);
        if(formValues.length === 0){
            return true;
        }
        let submissionState = this.submissionInprogress.getValue();
        if(submissionState == true){
            return false;
        }
        return true;
    }
}
