import {Component, forwardRef, Input, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
declare var google: any;

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MapInputComponent),
  multi: true
};

const noop = () => {
};

@Component({

  selector: 'ch-map-input',
  templateUrl: 'map.component.html',
  styles: [
    require('./map.component.scss')
  ],
  providers: [
    CUSTOM_VALUE_ACCESSOR,
  ]
})
export class MapInputComponent implements ControlValueAccessor, OnInit {
  opened: boolean = false;
  size: string;
  locationSearchTxt:string;
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private _autocomplete:any;

  @Input() location: LocationInterface = {
    lat: 0.0, lng: 0.0
  };
  @Input() marker: LocationInterface;

  constructor() { 

  }

  autocomplete() {
    console.log("called");
    if(typeof google != 'undefined' ){
        console.log(google);
      this._autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"), {});
      google.maps.event.addListener(this._autocomplete, 'place_changed', () => {
          let place = this._autocomplete.getPlace();

          this.location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            physical_address: {
              country: place.address_components[3].long_name,
              county: place.address_components[2].long_name,
              name: place.formatted_address
            }
          };
          this.marker = this.location;
          this.onChangeCallback(this.marker);
          this.openMapModal('large');

      });
    }
  }

  setPosition(position){
    this.location = {lat: position.coords.latitude, lng: position.coords.longitude};
  }

  onLocationSearchChange($event){
    console.log($event);
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
    setTimeout(() => {
      this.autocomplete();
    },2000);
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value)
      this.location = value;
  }

  openMapModal(size: string) {
    console.log("Mapping activated");
    this.size = size;
    this.opened = !this.opened;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }

  cancel() {
    this.opened = false;
  }

  mapClicked($event: any) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
    this.onChangeCallback(this.marker);
  }
}

export interface LocationInterface {
  lat?: number;
  lng?: number;
  physical_address?: {
    country: string,
    county: string,
    name?: string
  }

}

