import { Component, OnInit } from '@angular/core';
import {
  AuthService,
} from '../shared';
import { Subject, BehaviorSubject } from 'rxjs';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';


@Component({

  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
  styles: [
  	require('./forgot-password.component.scss')
  ]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassForm: FormGroup;
  submissionInprogress:Subject<boolean> = new BehaviorSubject<boolean>(null);
  serverMessage:any = {sent:false};

	constructor(private authService: AuthService,private fb: FormBuilder) {
    this.forgotPassForm = fb.group({
      'email': ['',Validators.required]
    });
	}

	ngOnInit() {
	}

	onSubmit(data) {
    this.submissionInprogress.next(true);
    this.authService.sendReminder(data).then((data) => {
      this.serverMessage.message = data.message;
      this.serverMessage.type = 'success';
      this.serverMessage.sent = true;
      this.submissionInprogress.next(false);

    }).catch(res => {
      this.serverMessage.type = 'danger';
      this.submissionInprogress.next(false);
      let body = res.json();
      this.serverMessage.message = body.error.message;
      if(this.serverMessage instanceof Array){
        //TODO
        if(body.status_code == 422){
          //Attach this error to formControl
        }
        //Concat all the messages into one body
        this.serverMessage.message = "Something went wrong try again";
      }
    });
  }

  onChanges(event) {

  }

}
