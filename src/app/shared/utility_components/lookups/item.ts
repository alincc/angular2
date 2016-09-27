import {
	Directive, 
	TemplateRef
} from '@angular/core';

@Directive({selector: 'template[chLookupItem]'})
export class ChLookupItemTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
