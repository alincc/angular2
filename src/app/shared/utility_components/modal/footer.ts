import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[ch-modal-footer]'})
export class CHModalFooter {
  constructor(public templateRef: TemplateRef<any>) {}
}
