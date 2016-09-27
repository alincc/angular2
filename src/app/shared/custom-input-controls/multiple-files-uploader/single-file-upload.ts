import {Component, Output, EventEmitter} from '@angular/core';
import {S3uploaderService, UploadDirective} from "../../s3uploader";

@Component({
  selector: 'ch-single-file-uploader',
  styles: [
    require('./single-file-upload.scss')
  ],
  templateUrl: './single-file-upload.html',
  providers: [
    S3uploaderService
  ]
})

export class SingleFileUploadComponent {
  progress: number = 0;
  inProgress: boolean = false;
  fileurl: string = '';

  @Output() fileUploaded = new EventEmitter();
  @Output() fileRemoved = new EventEmitter();

  constructor(private s3Upload: S3uploaderService) {
  }

  upload() {
    return this.s3Upload.upload();
  }

  pauseUpload(index) {
  }

  removeUpload() {
    this.fileRemoved.emit(this.fileurl);
    this.fileurl = '';
  }

  onFileSelect(event) {
    this.s3Upload.add(event.srcElement.files);
    let res = this.upload();
    res.fileStatus$.asObservable().subscribe(res => {
      //Subscribe to progess
      this.inProgress = true;
      this.progress = Math.floor((res.progress / res.total) * 100);
      if (res.status === 'COMPLETE') {
        this.fileurl = res.finalUrl;
        this.inProgress = false;
        this.fileUploaded.emit(this.fileurl);
      }
    })

  }

}
