import { Directive, Input, HostListener, ElementRef, Renderer } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ChPick } from './pick';

@Directive({
  selector: '[chPickOption]',
  exportAs: 'chPickOption',
  host: {
    'role': 'button',
  },
})
export class ChPickOption {

  // Use a getter to prevent direct altering
  get active() {
    return this._active;
  }

  @Input('chPickOption') set setValue(value: any) {
    this._value = value;
  }

  @Input() chPickActiveClass: string;

  private _value: any;
  private _active = false;
  private _subscription: Subscription;

  constructor(private element: ElementRef, private renderer: Renderer, private chPick: ChPick) {}

  @HostListener('click')
  @HostListener('keydown.Space', ['$event'])
  @HostListener('keydown.Enter', ['$event'])
  pick(evt: any) {
    if (evt) {
      evt.preventDefault();
    }
    this.chPick.selectOption(this._value);
  }

  ngOnInit() {
    this._subscription = this.chPick.values.subscribe(value => {
      this._active = this._isActive(value);

      const activeClass = this.chPickActiveClass || this.chPick.chPickActiveClass;
      if (activeClass) {
        this.renderer.setElementClass(this.element.nativeElement, activeClass, this.active);
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.chPick.optionRemoved(this._value);
  }

  private _isActive(value: any) {
    if (this.chPick.isMultiple) {
      if (!value) return false;
      return Array.isArray(value) ? value.indexOf(this._value) > -1 : !!value[this._value];
    } else {
      return this._value === value;
    }
  }
}
