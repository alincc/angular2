import {Directive,HostBinding } from '@angular/core';

@Directive({ 
	selector: '[show-password-input]'
})
export class ToggleInputDisplay
{
    @HostBinding() type: string;
     
    constructor(){
        this.type='password';
    }
    
    changeType(type:string): void {
        this.type = type;
    }
}