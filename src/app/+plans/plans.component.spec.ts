// import {
// 	beforeEach,
// 	beforeEachProviders,
// 	describe,
// 	expect,
// 	it,
// 	inject,
// 	MockApplicationRef
// } from '@angular/core/testing';

// import { provide, ApplicationRef} from '@angular/core';
// import { APP_BASE_HREF } from '@angular/common';
// import { ROUTER_DIRECTIVES}  from '@angular/router';

// import {
// 	ComponentFixture,
// 	TestComponentBuilder
// } from '@angular/compiler/testing';

// import { Component } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { AppComponent }  from '../app.component';
// import { PlansComponent }  from './plans.component';

// describe('Component: Plans', () => {
// 	let builder: TestComponentBuilder;

// 	//setup
// 	beforeEachProviders(() => [
// 		PlansComponent,
// 		TestComponentBuilder,
// 		ROUTER_DIRECTIVES,
// 		provide(APP_BASE_HREF, { useValue: '/' }),
// 		provide({ useValue: PlansComponent }),
// 		provide(ApplicationRef, { useClass: MockApplicationRef }),
// 	]);

// 	beforeEach(inject([TestComponentBuilder], tcb => {
// 		builder = tcb
// 	}));

// 	//it('should fulfill dependencies', injectAsync(
// 	// [TestComponentBuilder], (tcb) => {
// 	//     return tcb
// 	//     .overrideDirectives(
// 	//         HomeComponent, PlansComponent,MdButton
// 	//     )
// 	//     .createAsync(HomeComponent).then((fixture) => {

// 	//     });
// 	// }
// 	//));

// 	it('should inject the component', inject([PlansComponent], component => {
// 		expect(component).toBeTruthy();
// 	}));

// 	it('should create the component', inject([], () => {
// 		return builder.createAsync(PlansComponentTestController).then((fixture: ComponentFixture<any>) => {
// 			let query = fixture.debugElement.query(By.directive(PlansComponent));
// 			expect(query).toBeTruthy();
// 			expect(query.componentInstance).toBeTruthy();
// 		});
// 	}));

// });

// @Component({
//   selector: 'test',
//   template: `
//     <app-plans></app-plans>
//   `,
//   directives: [PlansComponent]
// })
// class PlansComponentTestController {
// }


