// import {
//   beforeEach,
//   beforeEachProviders,
//   describe,
//   expect,
//   it,
//   inject,
// } from '@angular/core/testing';
// import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
// import { Component } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { RegistrationFormComponent } from './registration-form.component';

// describe('Component: RegistrationForm', () => {
//   let builder: TestComponentBuilder;

//   beforeEachProviders(() => [RegistrationFormComponent]);
//   beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
//     builder = tcb;
//   }));

//   it('should inject the component', inject([RegistrationFormComponent],
//       (component: RegistrationFormComponent) => {
//     expect(component).toBeTruthy();
//   }));

//   it('should create the component', inject([], () => {
//     return builder.createAsync(RegistrationFormComponentTestController)
//       .then((fixture: ComponentFixture<any>) => {
//         let query = fixture.debugElement.query(By.directive(RegistrationFormComponent));
//         expect(query).toBeTruthy();
//         expect(query.componentInstance).toBeTruthy();
//       });
//   }));
// });

// @Component({
//   selector: 'test',
//   template: `
//     <app-registration-form></app-registration-form>
//   `,
//   directives: [RegistrationFormComponent]
// })
// class RegistrationFormComponentTestController {
// }

