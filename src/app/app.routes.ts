import { Routes  } from '@angular/router';
import { 
  LoggedInGuard, 
  RedirectIfAuthenticatedGuard,
  UnsavedChangesGuard,
  VerificationDocsAvailableGuard,
} from './shared';
import { 
  VerifyAccountComponent,
  routes as verificationRoutes,
} from './+signup';

import {
  SignupComponent
} from './+signup';

import { 
  LoginComponent
} from './+login';

import {
  ForgotPasswordComponent
} from './+forgot-password'

import {
  DashboardComponent,
  DashboardRoutes
} from './+dashboard';

import {
  PrivacyPolicyComponent
} from './+privacy-policy'

import {
  TermsOfUseComponent
} from './+terms-of-use';

import { 
  PracticesComponent
} from './+practices';


export const ROUTES: Routes = [
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'practices',
    component: PracticesComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/signup'
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [
      RedirectIfAuthenticatedGuard
    ],
    canDeactivate: [],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      RedirectIfAuthenticatedGuard
    ]
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    canActivate: [RedirectIfAuthenticatedGuard]
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent,
    children: verificationRoutes,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: DashboardRoutes,
    canActivate: [LoggedInGuard,VerificationDocsAvailableGuard]
  }
];
