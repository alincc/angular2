import {Component, ViewEncapsulation, Output, EventEmitter} from '@angular/core';

@Component({

  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    require('./sidebar.component.scss')
  ],
  encapsulation:ViewEncapsulation.None
})

export class SidebarComponent {
  @Output() selected = new EventEmitter();

  select() {
    this.selected.emit(false);
  }
}
