import {Component, forwardRef, Input, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultipleFilesUploaderComponent),
  multi: true
};

const noop = () => {
};

@Component({

  selector: 'ch-multiple-files-uploader',
  templateUrl: './multiple-files-uploader.component.html',
  styles: [
    require('./multiple-files-uploader.component.scss')
  ],
  providers: [
    CUSTOM_VALUE_ACCESSOR
  ]
})
export class MultipleFilesUploaderComponent implements ControlValueAccessor,OnInit {
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  isDisplay:boolean;

  @Input() minFilesAllowed: number = 1;

  @Input() 
  set display(display:boolean){
    console.log(display);
    this.isDisplay = display;
  }

  numberOfControls: number[];
  files: string[] = [];
  constructor() {
  }

  ngOnInit() {
    this.numberOfControls = new Array(this.minFilesAllowed);
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value){
      this.files = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn) {
    this._onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn) {
    this._onTouchedCallback = fn;
  }

  onFileUploaded($event) {
    this.files.push($event);
    this._onChangeCallback(this.files);
  }

  removeFile($event)
  {
    var index = this.files.indexOf($event, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    this._onChangeCallback(this.files);
  }
}
