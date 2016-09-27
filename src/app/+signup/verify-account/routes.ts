import {
  Routes
} from '@angular/router';

import {
  MedicalComponent,
  NationalidComponent,
  VerifyphoneComponent
} from '../shared';

import {UnsavedChangesGuard} from "../../shared/guards/unsavedChangesGuard";

export const routes: Routes = [
  {
    path: '', redirectTo: 'medical-license'
  },
  {
    path: 'medical-license',
    component: MedicalComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'national-id',
    component: NationalidComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'phone',
    component: VerifyphoneComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
];
