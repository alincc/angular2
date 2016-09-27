import {Directive, HostListener} from '@angular/core';
import {ChPopoverTrigger} from './trigger';

@Directive({
  selector: '[chPopover][chPopoverBehavior]',
})
export class ChPopoverBehavior {

  constructor(private trigger: ChPopoverTrigger) {}

  @HostListener('mouseenter')
  @HostListener('focus')

  onMouseOver() {
    this.trigger.chOpen = true;
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onMouseOut() {
    this.trigger.chOpen = false;
  }
};
