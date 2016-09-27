import {
	Component,
	OnInit
} from '@angular/core';

import {
  Router
}  from '@angular/router';

import {
  UserService
} from '../../../shared';

import {
  UsersService,
  UserInterface
} from '../../../+users/shared';

import {Http} from '@angular/http';
import {
    Validators,
    FormBuilder,
    FormGroup
} from "@angular/forms";

import {
  VerifyAccountStepsService,
  stepInterface
} from '../../verify-account/shared/verifyAccountSteps.service';

import {BehaviorSubject} from 'rxjs/Rx';


@Component({

  selector: 'ch-verifyphone',
  templateUrl: './verifyphone.component.html',
  styles: [
  	require('./verifyphone.component.scss')
  ]
})
export class VerifyphoneComponent implements OnInit {
	private _currentUser:UserInterface;
  verifyPhoneForm: FormGroup;
  serverMessage:any = {type:'',message:''};
  codeSent:boolean = false;
  submissionInprogress:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private _currentStep:stepInterface

	constructor(
      public http: Http,
      private router: Router,
      private fb: FormBuilder,
      private verifyAccountStepsService: VerifyAccountStepsService,
      private userService: UserService,
      private usersService: UsersService
    ) {

      this._currentStep = {
        name:'phone',
        position:3,
        isReady: false,
        url:'/verify-account/phone',
        prevUrl: '/verify-account/national-id',
        nextUrl: '/dashboard'
      };

      this.verifyAccountStepsService.setCurrentStep(this._currentStep);
      //subscribe to changes of the current route from anywhere else
      this.verifyAccountStepsService.getCurrentStep().subscribe(res => {
        this._currentStep = res;
      });


    }


	ngOnInit() {

    this._buildForm();

    this.userService.currentUser().subscribe(user => {
      this._currentUser = user;
      console.log(user);
      if(this._currentUser.profile.personal){
        let phone = this._currentUser.profile.personal.phone;
        this.verifyPhoneForm.controls['phone'].patchValue(phone);
      }
    });
	}

	private _buildForm(){
  	this.verifyPhoneForm = this.fb.group({
        'phone': [
          '',
          Validators.required
        ],
        'code': [
          '',
        ]
  	});
	}

  onSubmit(data){
    console.log(data);
    if(this.verifyPhoneForm.valid) {
      this.submissionInprogress.next(true);
      var response;
      if(data.code){
        response = this._verifyPhone(data);
      }else{
        response = this.sendVerificationCode(data);
      }
    }
  }

  private _verifyPhone(data){
    return this.usersService.verifyPhone(data).then(res => {
      //Set the phone number to be part of user's record
      this._currentUser.profile.personal.phone_verified = true;
      this._currentUser.profile.personal.phone = data.phone;
      
      this.userService.setPersonalRecord(this._currentUser.profile.personal);
      this._currentStep.isReady = true;
      this.verifyAccountStepsService.setCurrentStep(this._currentStep);
      this.continue();
      this.submissionInprogress.next(false);
    },error => {
      let res = error.json();
      this.serverMessage = {type:'danger',message: res.error.message.message};
      this.submissionInprogress.next(false);
    });;
  }

  sendVerificationCode(data){
    return this.usersService.sendPhoneVerifyCode(data).then(res => {
       //Set the phone verified field to be part of user's record
      this.codeSent = true;
      this.submissionInprogress.next(false);
    },error => {
      let res = error.json();
      console.log(res);
      if(res.error.status_code == 422){
        //TODO pick the error message from the server
        this.serverMessage = {type:'danger',message: "This phone number is already in use by someone else!"};
      }else{
        this.serverMessage = {type:'danger',message: res.error.message.message};
      }
      this.submissionInprogress.next(false);
    });
  }

  continue(){
    this.router.navigateByUrl(this._currentStep.nextUrl);
  }

  canDeactivate(){
    //If going to previous allow. If going to next make sure this is filled
    //return this._currentStep.goingBack === true ? true : this._currentStep.isReady;
    return true;
  }
}
