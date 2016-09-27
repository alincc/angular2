import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
//import {ChButtonIcon} from '../buttons/button-icon';
//import {ChIcon} from '../icons/icon';

@Component({
  selector: 'ch-pill',
  templateUrl: './pill.html',
  styles: [
    require('./pills.component.scss')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //directives: [ChButtonIcon, ChIcon],
  host: {
    '[class.chip]': 'true',
  },
})
export class ChPill {
  removable: boolean;
  unlinked: boolean = true;

  @Output() chPillRemove = new EventEmitter();

  constructor(public detector: ChangeDetectorRef) {}

  remove() {
    this.chPillRemove.emit(null);
  }
}
