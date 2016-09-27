import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({

  selector: 'ch-profile',
  templateUrl: './profile.component.html',
  styles: [
  	require('./profile.component.scss')
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
