import {
	Directive, 
	ElementRef, 
	Renderer
}from '@angular/core';

@Directive({
  selector: '[chPillImage]',
})
export class ChPillImage {

  constructor(private element: ElementRef, private renderer: Renderer) {}

  ngAfterContentInit() {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-pill__icon', true);
    this.renderer.setElementClass(this.element.nativeElement, 'slds-avatar--medium', false);
  }

}
