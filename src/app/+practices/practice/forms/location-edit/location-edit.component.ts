import {Component, OnInit, forwardRef} from '@angular/core';
import {MapInputComponent} from "../../../../shared/custom-input-controls/map/map.component";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
declare var google: any;

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LocationEditComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'ch-location-edit',
  templateUrl: './location-edit.component.html',
  styles: [require('./location-edit.component.scss')],
  providers: [
    CUSTOM_VALUE_ACCESSOR,
  ]
})
export class LocationEditComponent extends MapInputComponent implements ControlValueAccessor, OnInit  {
  constructor() {
    super()
  }


}
