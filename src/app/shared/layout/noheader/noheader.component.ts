import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({

  selector: 'noheader-layout',
  templateUrl: './noheader.component.html',
  styles: [
  	require('./noheader.component.scss')
  ],
  encapsulation: ViewEncapsulation.None,
})

export class NoheaderLayoutComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }

}
