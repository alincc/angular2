import {Component, forwardRef,Input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import { S3uploaderService} from "../../s3uploader";

const CUSTOM_VALUE_ACCESSOR = {
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileUploaderComponent),
    multi: true
};

const noop = () => {
};

@Component({
	selector: 'file-uploader',
	styles: [
        require('./file-uploader.component.scss')
    ],
	templateUrl: './file-uploader.component.html',
	providers: [
        CUSTOM_VALUE_ACCESSOR,
        S3uploaderService
    ]
})

export class FileUploaderComponent implements ControlValueAccessor {

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(private s3Upload: S3uploaderService) {

    }

    @Input() fileurl:string;

    onFileSelect(event) {
       this.s3Upload.add(event.srcElement.files);
       let res = this.upload();
        res.fileStatus$.asObservable().subscribe(res => {
            if(res.status === 'COMPLETE'){
               this.fileurl = res.finalUrl;
               this.onChangeCallback(this.fileurl);
            }
        })
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if(value)
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

    pauseUpload(index) {
        
    }

    removeUpload(index) {

    }

    
}