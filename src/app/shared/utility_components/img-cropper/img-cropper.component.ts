import {Component, Input, EventEmitter, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {CropperSettings} from "../../img-cropper/src/cropperSettings";
import {unescape} from "querystring";
import {ImageCropperComponent} from "../../img-cropper/src/imageCropperComponent";

@Component({

  selector: 'ch-img-cropper',
  templateUrl: './img-cropper.component.html',
  styles: [require('./img-cropper.component.scss')],
  encapsulation: ViewEncapsulation.None
})
export class ImgCropperComponent {
  @Input() opened: boolean = false;
  @Output() close = new EventEmitter();
  @Output() upload = new EventEmitter();

  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 150;

    this.cropperSettings.canvasWidth = 420;
    this.cropperSettings.responsive = true;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.rounded = true;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(0,0,0,0.5)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 1;

    this.data = {};

  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  closeWindow() {
    this.close.emit(false);
  }

  submit() {
    console.log('this.data', this.data);
    var blob = this.dataURItoBlob(this.data.image);
    var fd = new File([blob], this.uniqueName);
    this.upload.emit(fd);
    this.closeWindow();
  }

  dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    console.log('mimeString ', mimeString);
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  s4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  get uniqueName() {
    let guid = (this.s4() + this.s4() + "-" + this.s4() + "-4" + this.s4().substr(0, 3) + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4()).toLowerCase();
    return `${guid}.png`;
  }
}
