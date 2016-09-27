import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';

@Component({

  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [
    require('./home.component.scss')
  ],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  gotoSignup() {
    this.router.navigate(['/signup']);
  }

}

