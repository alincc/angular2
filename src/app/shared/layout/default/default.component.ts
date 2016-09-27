import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav';

@Component({

  selector: 'default-layout',
  templateUrl: './default.component.html',
  styles: [
  	require('./default.component.scss')
  ]
})
export class DefaultLayoutComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }

}
