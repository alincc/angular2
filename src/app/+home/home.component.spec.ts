// import {
//   beforeEach,
//   beforeEachProviders,
//   describe,
//   expect,
//   it,
//   inject,
//   MockApplicationRef
// } from '@angular/core/testing';

// import { provide , ApplicationRef} from '@angular/core';
// import { APP_BASE_HREF } from '@angular/common';
// import { ROUTER_PROVIDERS,ROUTER_PRIMARY_COMPONENT }  from '@angular/router';

// import { 
//   ComponentFixture, 
//   TestComponentBuilder 
// } from '@angular/compiler/testing';

// import { Component } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { HomeComponent } from './home.component';
// import { AppComponent }  from '../app.component';
// import { PlansComponent }  from '../+plans';
// import { MdButton } from '@angular2-material/button';

// describe('Component: Home', () => {
//   let builder: TestComponentBuilder;

//   //setup
//   beforeEachProviders(() => [
//     HomeComponent,
//     TestComponentBuilder,
//     ROUTER_PROVIDERS,
//     provide(APP_BASE_HREF, {useValue: '/'}),
//     provide(ROUTER_PRIMARY_COMPONENT, {useValue: HomeComponent}),
//     provide(ApplicationRef, {useClass: MockApplicationRef}),
//   ]);

//   beforeEach(inject([TestComponentBuilder], tcb => {
//     builder = tcb
//   }));

//   //it('should fulfill dependencies', injectAsync(
//       // [TestComponentBuilder], (tcb) => {
//       //     return tcb
//       //     .overrideDirectives(
//       //         HomeComponent, PlansComponent,MdButton
//       //     )
//       //     .createAsync(HomeComponent).then((fixture) => {

//       //     });
//       // }
//   //));

//   it('should inject the component', inject([HomeComponent],component => {
//       expect(component).toBeTruthy();
//   }));

//   it('should create the component', inject([], () => {
//     return builder.createAsync(HomeComponentTestController).then((fixture: ComponentFixture<any>) => {
//       let query = fixture.debugElement.query(By.directive(HomeComponent));
//       expect(query).toBeTruthy();
//       expect(query.componentInstance).toBeTruthy();
//     });
//   }));

// });

// @Component({
//   selector: 'test',
//   template: `
//     <app-home></app-home>
//   `,
//   directives: [HomeComponent]
// })
// class HomeComponentTestController {
// }

