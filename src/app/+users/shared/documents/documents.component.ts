import {
  Component,
  OnInit
} from '@angular/core';

import {
  Location
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

import {
  UserService
} from '../../../shared';

import {
  DocumentService,
} from './document.service';

import {
  DocumentInterface,
} from './document.interface';

import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
}from '@angular/router';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';
declare var _:any;

@Component({

  selector: 'ch-documents',
  templateUrl: 'documents.component.html',
  styles: [
  	require('./documents.component.scss')
  ]
})
export class DocumentsComponent implements CanActivate,OnInit {
  verificationDocsForm: FormGroup;
	submissionInprogress:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
	serverErrorMessage:any;
  isInDashboard:boolean = false;

  documentsControlsSettings:[DocumentControlInterface] = [
    {
      key: 'national_id',
      label: 'National ID',
      icon: 'nationalid-icon.png',
      placeholder: 'e.g: 28310211',
      value: {},
      validators: vdocValidator
    },
    {
      key: 'medical_license',
      label: 'Medical License',
      icon: 'medical-license-icon.png',
      placeholder: 'e.g: 280211',
      value:{},
      validators: vdocValidator
    }
  ];

	constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private documentService: DocumentService,
    private location: Location
  ) {
	}

	private _buildForm(){
    var controls = {};
    for (let key in this.documentsControlsSettings) {
      controls[this.documentsControlsSettings[key]['key']] = [
        this.documentsControlsSettings[key]['value'],
        this.documentsControlsSettings[key]['validators'],
      ];
    }
    this.verificationDocsForm = this.fb.group(controls);
	}

  private _setIsInDashboard(){
    let path = this.location.path();
    if(/dashboard/i.test(path)){
      this.isInDashboard = true;
    }
  }

  /*
  *
  * Submit data to server
  *
  */
  onSubmit(data){
    //number,url,type;
    //convert the data to the expected format on the server side
    this.submissionInprogress.next(true);
    var formData = new Array();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.push({
          number: data[key]['number'],
          url: data[key]['url'],
          type: key
        });
      }
    }

    this.documentService.add({'documents': formData}).then(res => {
      this.userService.setUsersVerificationDocs(res);
      this.submissionInprogress.next(false);
    },error => {
      console.log(error);
      this.submissionInprogress.next(false);
    });
  }

	ngOnInit() {
    if (!this.verificationDocsForm) {
      this._buildForm();
    }

    this.userService.currentUser().subscribe(user => {
      if(user && user.profile.verificationDocs){
        var docs = user.profile.verificationDocs;
        for (let key in docs) {
          if (this.verificationDocsForm) {
            (<FormControl>this.verificationDocsForm.controls[docs[key]['type']]).patchValue(
              {
                number: docs[key]['number'],
                url: docs[key]['url'],
                id: docs[key]['id'],
              }
            );
          }
        }
      }
    });
    //check the current route whether has dashboard
    this._setIsInDashboard();
	}

  updateDoc(doc){
    console.log(doc);
    //Update the document
    this.documentService.update(doc.id,doc).then(res => {
      this.userService.setUsersVerificationDocs(res);
    },error => {
      console.log(error);
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    //Check if submission is in progress
    let submissionState = this.submissionInprogress.getValue();
    if(submissionState == true){
      return false;
    }

    let formValues = _.values(this.verificationDocsForm.value).filter((e)=>!!e);

    if(formValues.length === 0){
      return true;
    }else{
      //Show status a sweet alert message to confirm navigation
      // let p = window.confirm("Discard changes?");
      // return p;
      return true;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    return false;
  }

}

/*
*
*
* Verification document validator
* a verification document must atleast have a number
*
*/
export function vdocValidator(c: FormControl):
{
  [s: string]: boolean
} {

  if(!c.value.number || c.value.number == ""){
    return { docNumberRequired : true};
  }else{
    console.log("valid")
    return null;
  }
}

export interface DocumentControlInterface{
  key: string,
  label: string,
  icon: string,
  placeholder: string,
  value:DocumentInterface,
  validators: any
}

