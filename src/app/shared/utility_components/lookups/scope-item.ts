import {Directive, TemplateRef, Input, Output, EventEmitter} from '@angular/core';

@Directive({selector: 'template[chPolymorphicItem]'})
export class ChLookupScopeItem {
  @Input() scopes: any[] = [];

  @Output() scopeChange = new EventEmitter();

  constructor(public templateRef: TemplateRef<any>) {}
}
