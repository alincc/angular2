// The file for the current environment will overwrite this one during build
// Different environments can be found in config/environment.{dev|prod}.ts
// The build system defaults to the dev environment


// The file for the current environment will overwrite this one during build
// Different environments can be found in config/environment.{dev|prod}.ts
// The build system defaults to the dev environment

// Angular 2
// rc2 workaround
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, ApplicationRef } from '@angular/core';
// Environment Providers
// let PROVIDERS: any[] = [
  // common env directives
// ];

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
// let _decorateModuleRef = function identity<T>(value: T): T { return value; };
//
// if ('production' === ENV) {
//   // Production
//   disableDebugTools();
//   enableProdMode();
//
//   PROVIDERS = [
//     ...PROVIDERS,
//     // custom providers in production
//   ];
//
// } else {
//
//   _decorateModuleRef = (modRef: any) => {
//     const appRef = modRef.injector.get(ApplicationRef);
//     const cmpRef = appRef.components[0];
//
//     let _ng = (<any>window).ng;
//     enableDebugTools(cmpRef);
//     (<any>window).ng.probe = _ng.probe;
//     (<any>window).ng.coreTokens = _ng.coreTokens;
//     return modRef;
//   };
//
//   // Development
//   PROVIDERS = [
//     ...PROVIDERS,
//     // custom providers in development
//   ];
//
// }
//
// export const decorateModuleRef = _decorateModuleRef;
//
// export const ENV_PROVIDERS = [
//   ...PROVIDERS
// ];

let production = true;

export const environment = {
  production: production,
  s3SignatureUrl: production == false ? '/s3-sign' : '/s3-sign',
  apiBaseUrl: production == false ? 'http://api.connecthealth.com/v1/' : 'https://apidev.connecthealth.io/v1/',
  tokenBaseUrl: production == false ? '/' : '/',
  fbAppId: production == false ? '629005817269307' : '629005817269307',
  keenProjectId: '57a3a49a80a7bd5c10f57c35',
  keenwriteKey: '3ce7aa6352cf4ea230aabe4c011cf3e71bfa2c7246751d089b9eb71bb6d4acedcd027d5af10ee149304104cb7a631cc6a3cca8f4564390ec5099e613a04aa3a6cc6b3688697dd999d03a3564de2d7d0c224baf0d49a29713531961f1fc2db14e',
  googleClientId: '69911888033-vsli08pkkaurrgc330amdte5v61onm8c.apps.googleusercontent.com',
  googleMapsApiKey: 'AIzaSyAJu5NyiUIdrG7l6HSGYSP51Gj6a4vLXjs'
};

