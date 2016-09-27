import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ch-preferences',
  templateUrl: './preferences.component.html',
  styles: [
    require('./preferences.component.scss')
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PreferencesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
