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

import {Http} from '@angular/http';
import {
    Validators,
    FormBuilder,
    FormGroup
} from "@angular/forms";

import {BehaviorSubject} from 'rxjs/Rx';


@Component({

  selector: 'ch-practice-availability',
  templateUrl: './practice-availability.component.html',
  styles: [
  	require('./practice-availability.component.scss')
  ]
})
export class PracticeAvailabilityComponent implements OnInit {

  location = {
    lat: 42,
    lng: 105
  };

  marker = {
    lat: 34,
    lng: 87
  }

	constructor(
      public http: Http,
      private router: Router,
      private fb: FormBuilder,
      private userService: UserService
  ) {

  }

	ngOnInit() {

	}

}
