import { Component, OnInit } from '@angular/core';

@Component({

  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styles: [
   require('./footer.component.scss')
  ]
})
export class FooterComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
