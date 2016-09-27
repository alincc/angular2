import {
  Routes
} from '@angular/router';

import {
  ProfileComponent
} from './profile';

import {
  UserPracticesComponent
} from './practices';

import {
  PracticeComponent
} from '../+practices';


export const DashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'profile'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    //canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'practices',
    component: UserPracticesComponent,
    //canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'practices/:id',
    component: PracticeComponent,
    //canDeactivate: [UnsavedChangesGuard]
  }
];
