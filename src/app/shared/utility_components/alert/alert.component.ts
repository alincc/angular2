import { Component, OnInit,Input } from '@angular/core';

@Component({

  selector: 'ch-alert',
  templateUrl: './alert.component.html',
  styles: [
  	require('./alert.component.scss')
  ]
})
export class AlertComponent implements OnInit {

  constructor() {}

  @Input() message:string;
  @Input() type:string;
  ngOnInit() {

  }

}
