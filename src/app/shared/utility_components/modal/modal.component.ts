import {
  Component,
  Input,
  Output,
  ElementRef,
  Renderer,
  ChangeDetectionStrategy,
  EventEmitter,
  HostListener,
  ViewChild,
  ContentChild
} from '@angular/core';

import {CHModalFooter} from './footer';

@Component({
  selector: 'ch-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
  styles: [
    require('./modal.component.scss'),
  ],
  host: {
    'tabindex': '0',
  },
})
export class ModalComponent {
  @Input() header: string = '';
  @Input() size: 'large';

  @Input() set directional(directional: string | boolean) {
    this._directional = this.toBoolean(directional);
  }

  get directional() {
    return this._directional;
  }

  toBoolean(value: any): boolean {
    switch (value) {
      case '':
        return true;

      case 'false':
      case '0':
        return false;

      default:
        return !!value;
    }
  }

  uniqueId(prefix: any) {
    if (!prefix) {
      prefix = 'uid';
    }
    let idCounter = 0;
    return `ch_${prefix}_${++idCounter}`;
  }

  @ViewChild('closeButton') closeButton: ElementRef;


  headingId = this.uniqueId('modal_header');

  open: boolean = true;

  @Input('open') set _open(_open: any) {
    _open = this.toBoolean(_open);
    if (_open === this.open) return;

    if (_open) {
      setTimeout(() => this.focusFirst());
    }
    this.open = _open;
  }

  @Output() openChange = new EventEmitter();

  @ContentChild(CHModalFooter) footer: CHModalFooter;

  private _directional = false;

  constructor(private element: ElementRef, private renderer: Renderer) {
  }

  @HostListener('keydown.esc', ['$event'])
  close(evt) {
    if (evt) {
      evt.stopPropagation();
    }
    this.openChange.emit(false);
  }

  @HostListener('click', ['$event'])
  stopPropagation(evt) {
    evt.stopPropagation();
  }

  focusFirst() {
    this.renderer.invokeElementMethod(this.closeButton.nativeElement, 'focus', []);
  }
}
;
