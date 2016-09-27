import {Directive, HostListener, ElementRef, Renderer, OnDestroy} from '@angular/core';
import {ChDropdown} from './dropdown';

@Directive({
  selector: '[chDropdownTrigger]',
  host: {
    'aria-haspopup': 'true',
  },
})
export class ChDropdownTrigger implements OnDestroy {
  private parentFocusEventSubscription: any;

  constructor(private element: ElementRef, private renderer: Renderer, private dropdown: ChDropdown) {
    this.parentFocusEventSubscription = this.dropdown.triggerFocusEventEmitter.subscribe(this.focus.bind(this));
  }

  ngOnDestroy() {
    this.parentFocusEventSubscription.unsubscribe();
  }

  @HostListener('click') toggleOpen() {
    this.dropdown.toggle(false,false);
  }
  @HostListener('keydown.arrowdown', ['$event'])
  onKeyDownOpen($event: any) {
    $event.preventDefault();
    this.dropdown.toggle(true,false);
  }

  focus() {
    this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
  }
}
