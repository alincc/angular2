import { Component, OnInit } from '@angular/core';
import {
  PlainLayoutComponent,
} from '../shared'


@Component({

  selector: 'ch-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styles: [
    require('./privacy-policy.component.scss')
  ],
})
export class PrivacyPolicyComponent implements OnInit{

  constructor() {}

  ngOnInit() {

  }
}
