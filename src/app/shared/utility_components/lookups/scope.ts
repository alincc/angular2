import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {ChLookupScopeItem} from './scope-item';


@Component({
  selector: 'ch-internal-lookup-scope',
  templateUrl: './scope.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChInternalLookupScope {
  @Input() scope: ChLookupScopeItem;
  @Output() scopeChange = new EventEmitter();

  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter();

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'slds-align-middle', true);
    renderer.setElementClass(element.nativeElement, 'slds-m-left--xx-small', true);
    renderer.setElementClass(element.nativeElement, 'slds-shrink-none', true);
  }

  onScopeChange(scope: any) {
    this.scopeChange.emit(scope);
  }
};
