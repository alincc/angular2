import {
	Directive, 
	ElementRef, 
	Renderer, 
	Optional
} from '@angular/core';
import {ChPill} from './pill';

@Directive({
  selector: 'a',
})
export class ChPillLink {

  constructor(@Optional() pill: ChPill, element: ElementRef, renderer: Renderer) {
    if (!pill) return;

    renderer.setElementClass(element.nativeElement, 'slds-pill__label', true);
    pill.unlinked = false;
  }

}
