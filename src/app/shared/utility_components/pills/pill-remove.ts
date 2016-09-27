import {Directive, Input} from '@angular/core';
import {ChPill} from './pill';

@Directive({
  selector: '[chPillRemove]',
})
export class ChPillRemove {

  @Input() set chPillRemovable(removable: any) {
    this.pill.removable = this.toBoolean(removable);
    this.pill.detector.markForCheck();
  }

  constructor(private pill: ChPill) {}

  ngOnInit() {
    if (this.pill.removable === undefined) {
      this.pill.removable = true;
    }
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
}
