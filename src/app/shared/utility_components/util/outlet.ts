import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: '[chInternalOutlet]',
  template: `{{content}}<template [ngTemplateOutlet]="contentTemplate"></template>`,
})
export class ChInternalOutlet {
  @Input() chInternalOutlet: string | TemplateRef<any>;

  get content() {
    return this.chInternalOutlet instanceof TemplateRef ? '' : this.chInternalOutlet;
  }

  get contentTemplate() {
    return this.chInternalOutlet instanceof TemplateRef ? this.chInternalOutlet : null;
  }
};
