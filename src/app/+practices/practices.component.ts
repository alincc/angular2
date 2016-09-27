import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import {
  Location
} from '@angular/common';

import {
  Router
}from '@angular/router';

import {
  Observable,BehaviorSubject
} from 'rxjs';

import {
  PracticeService,
  practiceInterface
} from './shared';

import {
  LocationInterface,
  UserService
} from '../shared';

import 'lodash';
// Lodash namespace
declare var _:any;

@Component({

  selector: 'ch-practices',
  templateUrl: './practices.component.html',
  styles: [
  	require('./practices.component.scss')
  ]
})
export class PracticesComponent implements OnInit {
  practices:practiceInterface[] = [];
  selectedPractice:practiceInterface = null;
  openPracticeForm:boolean = false;

  @Input() tpl: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private practiceService: PracticeService,
    private location: Location
  ) {
  }

  ngOnInit() {

    this.userService.currentUser().subscribe(user => {
      if(user && user.profile.practices){
        this.practices = user.profile.practices;
      }
    });
  }

  openPracticeModal() {
    this.openPracticeForm = true;
  }

  editPractice(practice: practiceInterface){
    this.selectedPractice = practice;
    this.openPracticeModal();
  }

  deletePractice(id: number){
    let confirmation = confirm("Are you sure you want to delete. This action is irreversible");
    if(confirmation === true){
      this.practiceService.destroy(id).then(res =>{
        _.remove(this.practices, (val) => {
          return id == val.id;
        });
      },error => {

      });
    }

  }
  
  onFormClose($event){
    if($event === true){
      this.openPracticeForm = false;
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    return true;
  }

}
