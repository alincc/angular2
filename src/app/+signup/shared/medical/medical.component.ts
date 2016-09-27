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
  UserInterface
} from '../../../+users/shared';

import {
  DocumentService,
  vdocValidator,
} from '../../../+users/shared/documents';

import {Http} from '@angular/http';
import {
    FormBuilder,
    FormGroup,
    FormControl
} from "@angular/forms";

import {
  VerifyAccountStepsService,
  stepInterface
} from '../../verify-account/shared/verifyAccountSteps.service';

import {BehaviorSubject} from 'rxjs/Rx';

@Component({

  selector: 'ch-medical',
  templateUrl: './medical.component.html',
  styles: [
  	require('./medical.component.scss')
  ]
})

export class MedicalComponent implements OnInit {
	private _currentUser:UserInterface;
  medicalForm: FormGroup;
  serverErrorMessage:any;
  submissionInprogress:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  isInDashboard:boolean = false;
  private _currentStep:stepInterface;

	constructor(
      public http: Http,
      private router: Router,
      private fb: FormBuilder,
      private verifyAccountStepsService: VerifyAccountStepsService,
      private userService: UserService,
      private documentService: DocumentService
    ) {
    
      this._currentStep = {
        name:'medicallicense',
        position:1,
        url:'/verify-account/medical-license',
        isReady: false,
        nextUrl:'/verify-account/national-id'
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
      if(user && user.profile.verificationDocs){
        var docs = user.profile.verificationDocs;
        for (let key in docs) {

          if (this.medicalForm && docs[key]['type'] == 'medical_license' ) {
            (<FormControl>this.medicalForm.controls[docs[key]['type']]).patchValue(
              {
                number: docs[key]['number'],
                url: docs[key]['url'],
              }
            );
          }
        }
      }

      //if form is ready activate navigation route
      if(this._currentStep){
        this._currentStep.isReady = this.medicalForm.valid;
        this.verifyAccountStepsService.setCurrentStep(this._currentStep);
      }

    });
	}

	private _buildForm(){
  	this.medicalForm = this.fb.group({
      'medical_license': [
        {},
        vdocValidator
      ]
  	});
  }

  /*
  *
  * Submit data to server
  *
  */
  onSubmit(data){
    //number,url,type;
    //convert the data to the expected format on the server side
    if(this.medicalForm.valid){
      this.submissionInprogress.next(true);
      var formData = new Array();
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          formData.push({
            number:data[key]['number'],
            url:data[key]['url'],
            type:key
          });
        }
      }

      this.documentService.add({'documents': formData}).then(res => {

        this.userService.setUsersVerificationDocs(res);
        this.submissionInprogress.next(false);

        if(this._currentStep){
          this._currentStep.isReady = true;
          this.verifyAccountStepsService.setCurrentStep(this._currentStep);
        }

        setTimeout(() => {
          //Push this to end of event loop to allow subscription to take effect
          this.continue();
        });
      },error => {
        let body = error.json();
        if(body.error.status_code == 422){
          //TODO pick the error message from the server
          this.serverErrorMessage = "This license number is already in use by someone else!";
        }else{
          this.serverErrorMessage = "Something went wrong, Try Again";
        }
        this.submissionInprogress.next(false);
      });
    }
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
