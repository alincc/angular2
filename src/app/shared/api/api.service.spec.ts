// import {
//   beforeEachProviders,
//   it,
//   describe,
//   expect,
//   inject,
//   beforeEach
// } from '@angular/core/testing';

// import { Http, Headers, HTTP_PROVIDERS} from '@angular/http';

// import { ApiService } from './api.service';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

// describe('Api Service', () => {
//   let service;

//   //setup
//   beforeEachProviders(() => [
//     HTTP_PROVIDERS, ApiService
//   ]);

//   beforeEach(inject([ApiService], s => {
//     service = s;
//   }));

//   it('should return api response object',done => {
//     // service.get('').subscribe(x => {
 
//     //   done();
//     // });
//     done();

//   });

//   it('should return api response object', done => {
//     // service.post().subscribe(x => {
  
//     //   done();
//     // });
//     done();
//   });

//   it('should return base api url', () => {
//     let response = service.getApiBaseUrl();
//     expect(response).toBeDefined();
//   });

//   it('should return token url', () => {
//     let response = service.getTokenBaseUrl();
//     expect(response).toBeDefined();
//   });

//   it('should return url headers', () => {
//     // let response = service.getTokenHeader();
//     // expect(response).toEqual(jasmine.any(Headers));
//   });

// });
