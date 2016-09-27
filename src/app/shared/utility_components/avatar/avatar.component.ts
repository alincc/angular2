import {
  Component,
  forwardRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

import {S3uploaderService} from "../../s3uploader";

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AvatarComponent),
  multi: true
};

const noop = () => {
};

@Component({

  selector: 'ch-avatar',
  templateUrl: './avatar.component.html',
  styles: [
    require('./avatar.component.scss')
  ],
  providers: [
    CUSTOM_VALUE_ACCESSOR,
    S3uploaderService
  ]
})

export class AvatarComponent implements ControlValueAccessor {

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  modalOpen: boolean = false;

  constructor(private s3Upload: S3uploaderService) {

  }

  @Input() fileurl: string;
  tempFile: string;
  progress: number = 0;
  inProgress: boolean = false;

  onFileSelect(data:any) {
    //TODO Get the file and display it temporarily
    //TODO check if previous file exists. If it does use the same file name to allow deletion of
    // the previous avatar in S3

    this.s3Upload.add( [data]);
    let res = this.upload();
    res.fileStatus$.asObservable().subscribe(res => {
      //Subscribe to progess
      this.inProgress = true;
      this.progress = Math.floor((res.progress / res.total) * 100);

      if (res.status === 'COMPLETE') {
        console.log("completed");
        this.fileurl = res.finalUrl;
        //setTimeout(() => {
          this.inProgress = false;
          this.onChangeCallback(this.fileurl);

        //}, 1000);
      }
    })
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {

    console.log(value);
    if (value)
      this.fileurl = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }

  upload() {
    return this.s3Upload.upload();
  }

  openUploadModal() {
    this.modalOpen = true;
  }

  closeUploadModal() {
    this.modalOpen = false;
  }

  uploadImage(data: any) {
    if(data != null)
    {
      this.onFileSelect(data);
    }
  }

  pauseUpload(index) {

  }

  removeUpload(index) {

  }
}
