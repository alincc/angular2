import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
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
  FormGroup
} from '@angular/forms';

import {
  Observable, BehaviorSubject
} from 'rxjs';

import {
  PracticeService,
  practiceInterface
} from '../../shared';

import {
  LocationInterface,
  UserService
} from '../../../shared';

import 'lodash';
// Lodash namespace
declare var _: any;

@Component({

  selector: 'ch-practice-forms',
  templateUrl: './practice-forms.component.html',
  styles: [
    require('./practice-forms.component.scss')
  ]
})

export class PracticeFormsComponent implements OnInit {

  practiceAdditionForm: FormGroup;
  submissionInprogress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  serverErrorMessage: any;
  practices: practiceInterface[] = [];
  modalOpen: boolean = false;
  modalHeader: string = "";
  formSection: string = 'new';
  modalSize: string = 'large';
  private _practice: practiceInterface;

  @Input()
  set selectedPractice(practice: practiceInterface) {
    this.modalSize = '';
    if (practice) {
      this._practice = practice;
    } else {
      this._practice = {
        name: '', physical_address: '', phone: '', email: '', services: [], photos: [],
        geo_location: {
          lat: 0.0, lng: 0.0
        }
      }
    }
    this._buildForm();
  }

  @Input() set section(section: string) {
    this.formSection = section ? section : 'new';

    this.modalSize = 'large';
    switch (section) {

      case "overview":
        this.modalHeader = "Edit Overview";
        break;

      case "photos":
        this.modalHeader = "Edit Photos";
        break;

      case "phone":
        this.modalHeader = "Edit Phone";
        break;

      case "web":
        this.modalHeader = "Edit Web and Social";
        break;

      case "location":
        this.modalHeader = "Edit Location";
        break;

      case "speciality":
        this.modalHeader = "Edit Specialiaty";
        break;

      case "name":
        this.modalHeader = "Edit Name";
        break;

      default:
        this.modalHeader = null;
        this.modalSize = '';
        break;
    }
    this._buildForm();
  }

  @Input()
  set openForm(status: boolean) {
    this.modalOpen = status ? status : false;
  }

  @Output() formClosed = new EventEmitter();

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private practiceService: PracticeService,
              private location: Location) {
    //Get this practice data from the session
    this.userService.currentUser().subscribe(user => {
      if (user && user.profile.practices) {
        this.practices = user.profile.practices;
        //Set the current pract
      }
    });

  }

  private _buildForm() {
    this.practiceAdditionForm = this.fb.group({
      'name': [
        this._practice.name,
        Validators.required
      ],
      'id': [
        this._practice.id
      ],
      'phone': [
        this._practice.phone
      ],
      'mobile_phone': [
        this._practice.mobile_phone
      ],
      'physical_address': [
        this._practice.physical_address
      ],
      'email': [
        this._practice.email
      ],
      'services': [
        this._practice.services,
      ],
      'overview': [
        this._practice.overview,
      ],
      'photos': [
        this._practice.photos,
      ],
      'geo_location': [
        this._practice.geo_location,
      ],
      'website': [
        this._practice.website,
      ],
      'facebook_page': [
        this._practice.facebook_page,
      ],
      'ch_url': [
        this._practice.ch_url,
      ],
    });
  }

  ngOnInit() {
    if (!this.practiceAdditionForm) {
      this._buildForm();
    }
  }

  closeModal() {
    this.modalOpen = false;
    this.formClosed.emit(true);
  }

  saveAddMore() {
    this.onSubmit(this.practiceAdditionForm.value);
  }

  onSubmit(data: practiceInterface) {
    console.log(data);
    if (this.practiceAdditionForm.valid) {
      this._saveData(data);
    }
  }

  private _addPracticesToSession(practice: practiceInterface) {
    //Replace the degree that matches the selected(Search by id) and clear selected
    var matchIndex = null;
    _.filter(this.practices, (pra, index) => {

      if (pra.id === practice.id) {
        matchIndex = index;
        return true;
      }
      return false;
    });

    if (matchIndex !== null) {
      this.practices[matchIndex] = practice;
    } else {
      this.practices.push(practice);
    }
    this.userService.setUsersPractices(this.practices);
  }

  private _saveData(data) {
    //Geo_location is used to also get physical address. Swap it to physical address here.
    if (data.geo_location) {
      data.latitude = data.geo_location.lat;
      data.longitude = data.geo_location.lng;
      if (data.geo_location.physical_address) {
        data.physical_address = data.geo_location.physical_address.name;
        if (data.geo_location.physical_address.name)
          data.country = data.geo_location.physical_address.country;
        if (data.geo_location.physical_address.county)
          data.county = data.geo_location.physical_address.county;
      }
    } else {
      data.latitude = 0;
      data.longitude = 0;
    }

    this.submissionInprogress.next(true);
    var submissionMethod = null
    if (data.id) {
      submissionMethod = this.practiceService.update(data.id, data);
    } else {
      submissionMethod = this.practiceService.add(data);
    }

    submissionMethod.then((res) => {
      this.submissionInprogress.next(false);
      //Update user's practices;
      this._addPracticesToSession(res)
      this._buildForm();
      this.closeModal();
    }).catch(error => {
      this.submissionInprogress.next(false);
      let body = error.json();
      this.serverErrorMessage = body.error.message;
      if (this.serverErrorMessage instanceof Array) {
        //TODO
        if (body.status_code == 422) {
          //Attach this error to formControl
        }
        //Concat all the messages into one body
        this.serverErrorMessage = "Something went wrong, Try Again";
      }

    });
  }

  onFormModalOpenChange($event) {
    console.log($event);
    if ($event == false)
      this.closeModal();
  }
}
