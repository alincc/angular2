import {
  Component,
  forwardRef,
  Input,
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import {DocumentInterface} from "../../../+users";
import {S3uploaderService} from "../../s3uploader";

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VDocumentUploaderComponent),
  multi: true
};

const noop = () => {
};

@Component({

  selector: 'ch-v-document-uploader',
  templateUrl: './v-document-uploader.component.html',
  styles: [
    require('./v-document-uploader.component.scss')
  ],
  providers: [
    CUSTOM_VALUE_ACCESSOR
  ]
})

export class VDocumentUploaderComponent implements ControlValueAccessor {
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  modalOpen: boolean = false;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  progress: number = 0;
  inProgress: boolean = false;
  showDropzone: boolean = false;

  @Input() showSingle: boolean;
  @Input() document: DocumentInterface = {url: '', number: ''};
  @Input() placeholder: string;
  @Input() label: string;
  @Input() icon: string;

  constructor(private s3Upload: S3uploaderService) {
  }

  onFileSelect(event) {
    console.log(event);
    this.s3Upload.add(event.srcElement.files);

    let res = this.upload();
    res.fileStatus$.asObservable().subscribe(res => {
      //Subscribe to progess
      this.inProgress = true;
      this.progress = Math.floor((res.progress / res.total) * 100);
      this.progress = isNaN(this.progress) ? this.progress : 0;

      if (res.status === 'COMPLETE') {
        this.document.url = res.finalUrl;
        this.onChangeCallback(this.document);
        this.inProgress = false;
        console.log(this.document);
      }
    })
  }

  onIdChange(newValue) {
    this.document.number = newValue;
    this.onChangeCallback(this.document);
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value)
      this.document = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }

  toggleUploader() {
    this.showDropzone = !this.showDropzone;
  }

  openEditModal() {
    this.modalOpen = true;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }

  upload() {
    return this.s3Upload.upload();
  }

  pauseUpload(index) {

  }

  triggerFile() {
    // do something
    // trigger input type="file" here
    //this.fileInput.nativeElement.click();
  }

  removeUpload() {
    //this.s3Upload.delete(this.document.number);
    this.document = {url: '', number: ''};
  }
}
