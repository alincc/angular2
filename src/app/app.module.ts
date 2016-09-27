import {NgModule, ApplicationRef} from '@angular/core';
import {removeNgStyles, createNewHosts} from '@angularclass/hmr';
import {DataResolver} from './app.resolver';
import {
    AppState, 
    InteralStateType
} from './app.service';

import {
    ApiService,
    S3uploaderService,
    AuthService,
    Analytics,
    FbService,
    UserService,
    GoogleService,
    GoogleAnalytics,
    KeenAnalytics
} from './shared';

import {
    VerifyAccountStepsService
} from "./+signup/verify-account";
import {PracticeService} from "./+practices/shared/practice.service";
import {DoctorService} from "./shared/doctor/doctor.service";
import {UsersService} from "./+users/shared/users.service";
import {EducationService} from "./+users/shared/education/education.service";
import {DocumentService} from "./+users/shared/documents/document.service";
import {LoggedInGuard} from "./shared/guards/LoggedInGuard";
import {RedirectIfAuthenticatedGuard} from "./shared/guards/RedirectIfAuthenticatedGuard";
import {UnsavedChangesGuard} from "./shared/guards/unsavedChangesGuard";
import {PersonalInfoAvailableGuard} from "./shared/guards/personalInfoAvailable.guard";
import {VerificationDocsAvailableGuard} from "./shared/guards/verificationDocsAvailable.guard";

type StoreType = {
    state: InteralStateType,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    providers: [ // expose our Services and Providers into Angular's dependency injection
        // ENV_PROVIDERS,
        DataResolver,
        AppState,
        S3uploaderService,
        UsersService,
        PracticeService,
        EducationService,
        DocumentService,
        DoctorService,
        LoggedInGuard,
        RedirectIfAuthenticatedGuard,
        UnsavedChangesGuard,
        VerificationDocsAvailableGuard,
        PersonalInfoAvailableGuard,
        ApiService,
        Analytics,
        FbService,
        AuthService,
        UserService,
        GoogleService,
        GoogleAnalytics,
        KeenAnalytics,
        VerifyAccountStepsService
    ]
})

export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {
    }

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        console.log('HMR store', store);
        this.appState._state = store.state;
        this.appRef.tick();
        delete store.state;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        const state = this.appState._state;
        store.state = state;
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}

