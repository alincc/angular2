import {
  Component,
  OnInit,
} from '@angular/core';

import {
  recentUpdateInterface
} from './recent-update.interface';

@Component({

  selector: 'ch-recent-updates',
  templateUrl: 'recent-updates.component.html',
  styles: [
    require('./recent-updates.component.scss')
  ]
})
export class RecentUpdatesComponent implements OnInit {
  recentUpdates: recentUpdateInterface[] = [];

  constructor() {  }

  ngOnInit() {
    this.recentUpdates = [
      {
        type: 'new-practice',
        title: 'New practice.',
        description: 'Fountain Healthcare added to your list.'
      },
      {
        type: 'new-practice',
        title: 'New practice.',
        description: 'Fountain Healthcare added to your list.'
      },
      {
        type: 'delete-practice',
        title: 'Delete practice.',
        description: 'Fountain Healthcare was deleted from your list.'
      },
      {
        type: 'new-appt',
        title: 'New appt.',
        description: 'on 21 Aug 2016 @ 8:00 PM w/ Julius Kamiri.'
      },
      {
        type: 'new-appt',
        title: 'New appt.',
        description: 'on 21 Aug 2016 @ 8:00 PM w/ Julius Kamiri.'
      }];
  }
}
