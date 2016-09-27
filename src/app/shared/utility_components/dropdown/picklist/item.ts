import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[chPicklistItem]'})
export class ChPicklistItemTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
