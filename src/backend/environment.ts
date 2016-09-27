// The file for the current environment will overwrite this one during build
// Different environments can be found in config/environment.{dev|prod}.ts
// The build system defaults to the dev environment

let production = true;
//TODO move this to process.env
export const environment = {
  production: production,
  apiBaseUrl: production == false ? 'api.connecthealth.com' : 'apidev.connecthealth.io',
  clientId: production == false ? 'test' : 'test',
  clientSecret: production == false ? 'test' : 'test'
};

