import {
  Component, 
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ch-user-practices',
  templateUrl: 'practices.component.html',
  styles: [
    require('./practices.component.scss')
  ],
  encapsulation: ViewEncapsulation.None
})

export class UserPracticesComponent implements OnInit {
  currentIndex: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    else {
      this.currentIndex = 2;
    }
  }

  next() {
    if (this.currentIndex < 2) {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0;
    }
  }
}
