import { Component,ContentChild } from '@angular/core';
import { ToggleInputDisplay } from './toggle-display-input';

@Component({

  selector: 'ch-show-password',
  templateUrl: './show-password.component.html',
  styles: [
  	require('./show-password.component.scss')
  ]
})
export class ShowPasswordComponent {

  	constructor() {}

  	show = false;

    @ContentChild(ToggleInputDisplay)
    input: ToggleInputDisplay;



    toggleShow()
    {
        this.show = !this.show;
        if (this.show){
            this.input.changeType("text");
        }
        else {
            this.input.changeType("password");
        }
    }

}
