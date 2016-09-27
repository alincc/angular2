import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UniversalModule} from 'angular2-universal';

import {App} from './app/app.component';
import {AppModule} from "./app/app.module";
//import {LocalStorage} from "./app/local-storage";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app/app.routes";
import {NoheaderLayoutComponent} from "./app/shared/layout/noheader/noheader.component";
import {GoogleLoginComponent} from "./app/shared/google-login/google-login.component";
import {FbLoginComponent} from "./app/shared/fb-login/fb-login.component";
import {PlainLayoutComponent} from "./app/shared/layout/plain-layout/plain-layout.component";
import {PhoneComponent} from "./app/shared/custom-input-controls/phone/phone.component";
import {UploadDirective} from "./app/shared/s3uploader/s3uploader.directive";
import {SingleFileUploadComponent} from "./app/shared/custom-input-controls/multiple-files-uploader/single-file-upload";

import {NavComponent} from "./app/shared/nav/nav.component";
import {TermsOfUseComponent} from "./app/+terms-of-use/terms-of-use.component";
import {PrivacyPolicyComponent} from "./app/+privacy-policy/privacy-policy.component";
import {SignupComponent} from "./app/+signup/signup.component";

import {LoginComponent} from "./app/+login/login.component";
import {ForgotPasswordComponent} from "./app/+forgot-password/forgot-password.component";
import {DashboardComponent} from "./app/+dashboard/dashboard.component";
import {UserPracticesComponent} from "./app/+dashboard/practices";

import {
  EducationComponent,
  DocumentsComponent,
  PracticeAvailabilityComponent,
  PersonalComponent
} from "./app/+users/shared";

import {
  ProfileComponent
} from "./app/+dashboard/profile/profile.component";

import {
    PreferencesComponent
} from "./app/+dashboard/preferences/preferences.component";

import {
  VDocumentUploaderComponent,
  TagInputComponent,
  MapInputComponent,
  MultipleFilesUploaderComponent
} from "./app/shared/custom-input-controls";

import {
  ModalComponent,
  ImgCropperComponent,
  ChDropdown,
  ChDropdownTrigger,
  ChDropdownItem,
  ChPickOption,
  ChInternalLookupScope,
  AvatarComponent,
  ChLookup,
  ChLookupItemTemplate,
  ChLookupScopeItem,
  ChPill,
  ChPillImage,
  ChPillLink,
  ChPillRemove,
  ShowPasswordComponent,
  HighlightDirective,
  AlertComponent,
  ToggleInputDisplay,
  SubmitButton,
  ChPopover,
  ChPopoverTrigger,
  ChPopoverBehavior
} from "./app/shared/utility_components";

import {
  PracticeComponent,
  PracticeFormsComponent,
  PracticesComponent,
} from "./app/+practices";

import {
    MedicalComponent,
    NationalidComponent,
    VerifyphoneComponent,
    VerifyAccountComponent
} from "./app/+signup";

import {SidebarComponent} from "./app/shared/sidebar/sidebar.component";
import {ImageCropperComponent} from "./app/shared/img-cropper/src/imageCropperComponent";
import {AgmCoreModule} from "angular2-google-maps/core";
import {environment} from "./app/environment";
import {
  RecentUpdatesComponent,
  PatientVolumeComponent,
  SeachesLikeYouComponent,
  TryFrontDeskComponent
} from "./app/+dashboard/practices";
import {LocationEditComponent} from "./app/+practices/practice/forms/location-edit/location-edit.component";
//TODO this is really bloated. Some of this should be moved to their own feature declarations
export function main() {
  @NgModule({
    bootstrap: [App],
    declarations: [App,
      NoheaderLayoutComponent,
      ShowPasswordComponent,
      AlertComponent,
      ToggleInputDisplay,
      SubmitButton,
      GoogleLoginComponent,
      FbLoginComponent,
      PlainLayoutComponent,
      ChPopover,
      ChPopoverTrigger,
      HighlightDirective,
      ChPopoverBehavior,
      PhoneComponent,
      UploadDirective,
      SingleFileUploadComponent,
      ChLookup,
      ChLookupItemTemplate,
      ChLookupScopeItem,
      ChPill,
      ChPillImage,
      ChPillLink,
      ChPillRemove,
      NavComponent,
      TermsOfUseComponent,
      PrivacyPolicyComponent,
      SignupComponent,
      ChDropdown,
      ChDropdownTrigger,
      ChDropdownItem,
      ChPickOption,
      ChInternalLookupScope,
      LoginComponent,
      ForgotPasswordComponent,
      DashboardComponent,
      DocumentsComponent,
      EducationComponent,
      PersonalComponent,
      ProfileComponent,
      PracticeAvailabilityComponent,
      //AnalyticsOn,
      VDocumentUploaderComponent,
      ModalComponent,
      TagInputComponent,
      AvatarComponent,
      MapInputComponent,
      MultipleFilesUploaderComponent,
      PracticesComponent,
      VerifyAccountComponent,
      MedicalComponent,
      NationalidComponent,
      VerifyphoneComponent,
      SidebarComponent,
      PracticeComponent,
      PracticeFormsComponent,
      PracticesComponent,
      ImgCropperComponent,
      ImageCropperComponent,
      UserPracticesComponent,
      RecentUpdatesComponent,
      PatientVolumeComponent,
      SeachesLikeYouComponent,
      TryFrontDeskComponent,
      LocationEditComponent,
      PreferencesComponent
    ],
    imports: [
      AppModule,
      UniversalModule,
      FormsModule,
      BrowserModule,
      ReactiveFormsModule,
      HttpModule,
      RouterModule.forRoot(ROUTES),
      AgmCoreModule.forRoot({
        apiKey: environment.googleMapsApiKey,
        libraries: ['places']
      })
    ]
  })
  class MainModule {
  }
  return MainModule;
}
