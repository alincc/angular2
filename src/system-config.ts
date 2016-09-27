/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'moment': 'vendor/moment/moment.js',
  '@angular2-material': 'vendor/@angular2-material',
  'angular2-google-maps': 'vendor/angular2-google-maps',
  'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
  "underscore": "vendor/underscore/underscore.js",
  '@ng2-img-cropper': 'vendor/ng2-img-cropper'
};

/** User packages configuration. */
const packages: any = {
  'moment': {
    format: 'cjs'
  },
  'underscore': {
    format: 'cjs'
  },
  'angular2-google-maps/core': {
    defaultExtension: 'js',
    main: 'index.js' // you can also use core.umd.js here, if you want faster loads
  },
  'ng2-img-cropper': {main: 'index.js', defaultExtension: 'js'}
};

// put the names of any of your Material components here
const materialPkgs: string[] = [
  'core',
  'button',
  'card',
  'toolbar',
  'input',
  'checkbox',
  'progress-bar',
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});


////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  'ng2-img-cropper',

  // App specific barrels.
  'app',
  'app/shared',
  'app/shared/nav',
  'app/shared/footer',
  'app/home',
  'app/listing',
  'app/plans',
  'app/signup',
  'app/+signup',
  'app/+home',
  'app/+listing',
  'app/+practices',
  'app/+practices/shared',
  'app/+signup/plans',
  'app/+users',
  'app/+users/shared',
  'app/shared/auto-form',
  'app/shared/s3uploader',
  'app/shared/auto-form/input-control',
  'app/shared/auto-form/shared',
  'app/+users/registration-form',
  'app/+plans',
  'app/+practices/registration-form',
  'app/+users/+verify-phone',
  'app/shared/auto-form/input-control/file-uploader',
  'app/shared/auto-form/input-control/map',
  'app/shared/fb-login',
  'app/shared/google-login',
  'app/shared/userservice',
  'app/+login/login',
  'app/+login',
  'app/+forgot-password',
  'app/+dashboard',
  'app/shared/layout/noheader',
  'app/shared/layout/default',
  'app/shared/utility_components/alert',
  'app/shared/utility_components/show-password',
  'app/shared/utility_components/button',
  'app/+users/update-profile/personal',
  'app/+users/update-profile/education',
  'app/+users/update-profile/documents',
  'app/+users/update-profile/practice',
  'app/shared/utility_components/modal',
  'app/shared/utility_components/popover',
  'app/shared/utility_components/avatar',
  'app/shared/utility_components/lookups',
  'app/shared/utility_components/pill',
  'app/shared/utility_components/pills',
  'app/shared/utility_components/dropdown',
  'app/shared/utility_components/pick',
  'app/shared/custom-input-controls',
  'app/shared/custom-input-controls/tag-input',
  'app/shared/custom-input-controls/verification-document-uploader',
  'app/shared/custom-input-controls/multiple-files-uploader',
  'app/shared/layout/plain-layout',
  'app/+terms-of-use',
  'app/+dashboard/profile',
  'app/+users/shared/medical',
  'app/+users/shared/nationalid',
  'app/+users/shared/verifyphone',
  'app/shared/custom-input-controls/phone',
  'app/+dashboard/practice',
  'app/shared/utility_components/img-cropper',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = {main: 'index'};
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'

  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages});
