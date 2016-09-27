import {Component, forwardRef } from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const CUSTOM_VALUE_ACCESSOR = {
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PhoneComponent),
    multi: true
};

const noop = () => {
};

@Component({

  	selector: 'ch-phone-input',
  	templateUrl: './phone.component.html',
  	styles: [
  		require('./phone.component.scss')
  	],
	providers: [
    	CUSTOM_VALUE_ACCESSOR,
	]
})
export class PhoneComponent implements ControlValueAccessor {

  	//Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    phone:any = {prefix:'+254',number:''};
    phoneStr: string;

  	constructor() {}

    onPhoneChange($event){
      this.phone.number = $event;
      this.formatForSubmission();
      this.phoneStr = this.phone.prefix+this.phone.number;
      this.onChangeCallback(this.phoneStr);
    }

  	//From ControlValueAccessor interface
    writeValue(value: any) {
        if(value){
		      this.phone.number = value;
          this._formatForDisplay();
        }
    }
    //From ControlValueAccessor interface
    registerOnChange(fn) {
		  this.onChangeCallback = fn;
    }

    removeTrailingZero($event){
      //Add - - - on the number
      this.onPhoneChange(this.phone.number);
      this._formatForDisplay();
    }

    private _formatForDisplay(){
      //Remove prefix if exists
      this.phone.number = this.phone.number.replace(/^\+254/, '');
      this.phone.number = this.phone.number.replace(/\B(?=(\d{3})+(?!\d))/g, " - ");
    }

    formatForSubmission(){
      this.phone.number = this.phone.number.replace(/^0/, '');
      this.phone.number = this.phone.number.replace(/ - /g, '');
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn) {
      this.onTouchedCallback = fn;
    }

}
