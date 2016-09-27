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

import {
    PreferencesComponent
} from './preferences';

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
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
  },
];
