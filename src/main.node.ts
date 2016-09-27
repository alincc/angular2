import {NgModule, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UniversalModule} from 'angular2-universal';

import {App} from './app/app.component';
import {NodeJsonpModule, NodeHttpModule, NodeModule} from "angular2-platform-node";
import {AppModule} from "./app/app.module";
import {ROUTES} from "./app/app.routes";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {NoheaderLayoutComponent} from "./app/shared/layout/noheader/noheader.component";
import {ShowPasswordComponent} from "./app/shared/utility_components/show-password/show-password.component";
import {AlertComponent} from "./app/shared/utility_components/alert/alert.component";
import {ToggleInputDisplay} from "./app/shared/utility_components/show-password/toggle-display-input";
import {SubmitButton} from "./app/shared/utility_components/submit-button/button.directive";
import {GoogleLoginComponent} from "./app/shared/google-login/google-login.component";
import {FbLoginComponent} from "./app/shared/fb-login/fb-login.component";
import {PlainLayoutComponent} from "./app/shared/layout/plain-layout/plain-layout.component";
import {ChPopover} from "./app/shared/utility_components/popover/popover";
import {ChPopoverTrigger} from "./app/shared/utility_components/popover/trigger";
import {ChPopoverBehavior} from "./app/shared/utility_components/popover/behavior";
import {PhoneComponent} from "./app/shared/custom-input-controls/phone/phone.component";
import {UploadDirective} from "./app/shared/s3uploader/s3uploader.directive";
import {SingleFileUploadComponent} from "./app/shared/custom-input-controls/multiple-files-uploader/single-file-upload";
import {ChLookup} from "./app/shared/utility_components/lookups/lookup";
import {ChLookupItemTemplate} from "./app/shared/utility_components/lookups/item";
import {ChLookupScopeItem} from "./app/shared/utility_components/lookups/scope-item";
import {ChPill} from "./app/shared/utility_components/pills/pill";
import {ChPillImage} from "./app/shared/utility_components/pills/pill-image";
import {ChPillLink} from "./app/shared/utility_components/pills/pill-link";
import {ChPillRemove} from "./app/shared/utility_components/pills/pill-remove";
import {NavComponent} from "./app/shared/nav/nav.component";
import {TermsOfUseComponent} from "./app/+terms-of-use/terms-of-use.component";
import {PrivacyPolicyComponent} from "./app/+privacy-policy/privacy-policy.component";
import {SignupComponent} from "./app/+signup/signup.component";
import {ChDropdown} from "./app/shared/utility_components/dropdown/dropdown";
import {ChDropdownTrigger} from "./app/shared/utility_components/dropdown/dropdown-trigger";
import {ChDropdownItem} from "./app/shared/utility_components/dropdown/dropdown-item";
import {ChPickOption} from "./app/shared/utility_components/pick/pick-option";
import {ChInternalLookupScope} from "./app/shared/utility_components/lookups/scope";
import {LoginComponent} from "./app/+login/login.component";
import {ForgotPasswordComponent} from "./app/+forgot-password/forgot-password.component";
import {DashboardComponent} from "./app/+dashboard/dashboard.component";
import {DocumentsComponent} from "./app/+users/shared/documents/documents.component";
import {UserPracticesComponent} from "./app/+dashboard/practices";
import {EducationComponent} from "./app/+users/shared/education/education.component";
import {PracticeAvailabilityComponent} from "./app/+users/shared/practice-availability";
import {PersonalComponent} from "./app/+users/shared/personal/personal.component";
import {ProfileComponent} from "./app/+dashboard/profile/profile.component";
import {PlansComponent} from "./app/+plans/plans.component";
import {VDocumentUploaderComponent} from "./app/shared/custom-input-controls/v-document-uploader/v-document-uploader.component";
import {ModalComponent} from "./app/shared/utility_components/modal/modal.component";
import {TagInputComponent} from "./app/shared/custom-input-controls/tag-input/tag-input.component";
import {AvatarComponent,HighlightDirective} from "./app/shared/utility_components";
import {MapInputComponent} from "./app/shared/custom-input-controls/map/map.component";
import {MultipleFilesUploaderComponent} from "./app/shared/custom-input-controls/multiple-files-uploader/multiple-files-uploader.component";
import {PracticesComponent} from "./app/+practices/practices.component";
import {
    MedicalComponent,
    NationalidComponent,
    VerifyphoneComponent,
    VerifyAccountComponent
} from "./app/+signup";
import {PracticeComponent} from "./app/+practices/practice/practice.component";
import {SidebarComponent} from "./app/shared/sidebar/sidebar.component";
import {ImgCropperComponent} from "./app/shared/utility_components/img-cropper/img-cropper.component";
import {ImageCropperComponent} from "./app/shared/img-cropper/src/imageCropperComponent";

@NgModule({
  bootstrap: [App],
  declarations: [
    App,
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
    ChPopoverBehavior,
    PhoneComponent,
    UploadDirective,
    SingleFileUploadComponent,
    ChLookup,
    ChLookupItemTemplate,
    ChLookupScopeItem,
    ChPill,
    HighlightDirective,
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
    PracticeAvailabilityComponent,
    PersonalComponent,
    ProfileComponent,
    PlansComponent,
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
    ImgCropperComponent,
    ImageCropperComponent,
    UserPracticesComponent
  ],
  imports: [
    AppModule,
    UniversalModule,
    FormsModule,
    NodeHttpModule, // Universal Http
    NodeJsonpModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ]
})
export class MainModule {
}
