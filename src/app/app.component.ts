import {
  Component,
  ViewEncapsulation,
} from '@angular/core';

// import {
//     Analytics,
//     GoogleAnalytics,
//     KeenAnalytics
// } from './shared';

@Component({
  selector: 'ch',
  templateUrl: 'app.component.html',
  styles: [
    require('./app.component.scss')
  ],
  encapsulation: ViewEncapsulation.None,
})

export class App{
  constructor() {}
}
