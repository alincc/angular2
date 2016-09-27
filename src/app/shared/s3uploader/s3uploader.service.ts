//declare var _;
//Place this at the top near your imports

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ManagedUpload, Policy} from './s3uploader.model';
// Lodash namespace
declare var _:any;

import { environment } from './../../environment';

@Injectable()
export class S3uploaderService {

    public managedUploads = [];
    public XHRRequestState = 'READY';
    //TODO move this to configuration file
    private _s3dataendpoint: string = environment.s3SignatureUrl;
    private _tag = 'S3Upload';
    private _policy: Policy;
    private _endpoint = '';

    constructor(private http: Http) {
        if (!this._policy)
            this._getS3Credentials();
    }

    // CRUD
    public add(file) {
        let files = _.toArray(file);
        files.map(file => {
            let folderPath = ((typeof this._policy.folder !== 'undefined') ? (this._policy.folder + '/') : '');
            let path = this._endpoint + folderPath;
            let managedUpload = new ManagedUpload(file, this._policy.folder, this._policy);
            managedUpload.xhr = this._xhrCreate(managedUpload);
            this.managedUploads.push(managedUpload);
        });
    }

    public delete(index) {

        let managedUpload = this._findWithIndex(index);
        if (managedUpload.status === 'PENDING')
            this.abort();

    }

    public reset() {

        this.abort();
        while (this.managedUploads.length) {
            this.managedUploads[0].remove();
        }

    }

    public abort() {
        let xhrAborted = false;
        let managedUpload = this._findMemberWithStatus('PENDING');
        if (managedUpload) {
            managedUpload.xhr.abort();
            this._changeUploadStatus(managedUpload, 'ABORTED');
            xhrAborted = true;
        }
        return xhrAborted;

    }

    //Upload
    public upload() {
        let files = this._findMemberWithStatus(['READY', 'ABORTED', 'ERROR']);
        if (files.length === 0)
            throw new Error('No files to upload in ' + this._tag);

        let filesInprogress = [];
        if(files.length === 1){
            return this._upload(files[0]);
        }else{
            files.each( file => {
               filesInprogress.push(this._upload(file));
            });
            return filesInprogress;
        }
        
    }

    //XHR Methods
    private _xhrCreate(managedUpload) {

        let xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('loadStart', ev => {

        });

        xhr.upload.addEventListener('progress', (ev:any) => {
            if(ev.loaded){
              managedUpload.progress = ev.loaded ; 
            }else{
              managedUpload.progress = 0 ;
            }
           managedUpload.total = ev.total;
           this._changeUploadStatus(managedUpload, 'PENDING');
        });

        xhr.upload.addEventListener('load', ev => {
        });

        xhr.upload.addEventListener('loadend', ev => {

        });

        xhr.upload.addEventListener('error', ev => {
            this._xhrOnIncomplete();
        });

        xhr.upload.addEventListener('abort', ev => {
            this._xhrOnIncomplete();
        });

        xhr.upload.addEventListener('timeout', ev => {

        });

        xhr.addEventListener('readystatechange', ev => {
            if (xhr.readyState === 4) {
                this._xhrOnComplete(managedUpload);
            }
        });

        return xhr;

    }

    private _xhrOnComplete(managedUpload) {
        managedUpload.updateFinalUrl();
        this._changeUploadStatus(managedUpload, 'COMPLETE');
        if (this._findMemberWithStatus(['READY', 'ABORTED', 'ERROR']))
            this.upload();

    }

    private _xhrOnIncomplete() {

    }

    // Utils
    private _findWithIndex(index) {

        return this.managedUploads[index];

    }

    private _findMemberWithStatus(status) {

        let statuses = typeof status === 'string' ? [status] : status;
        let managedUpload: any = _.filter(this.managedUploads, memberFile => {

            let statusMatch = _.filter(statuses, status => {
                return memberFile.status === status;
            });

            if (statusMatch.length !== 0)
                return true;

            return false;

        });

        if (managedUpload.length === 0)
            return null;

        return managedUpload;

    }

    private _upload(managedUpload) {

        if (!managedUpload.xhr || !managedUpload.formData)
            throw new Error('ManagedUpload has not been prepared for XHR in ' + this._tag);

        managedUpload.xhr.open('POST', this._endpoint, true);
        managedUpload.xhr.send(managedUpload.formData);
        this._changeUploadStatus(managedUpload, 'PENDING');
        return managedUpload;

    }

    // Stateful changes
    private _changeUploadStatus(managedUpload, status) {
        return managedUpload.changeStatus(status);
    }

    // Initial Get.
    private _getS3Credentials() {

        return this.http.get(this._s3dataendpoint)
            .map(response => response.json()).subscribe(

            response => {

                if (!response.xAmzBucket)
                    throw new Error('Bucket wasn\'t returned from API call. You must return an S3 bucket in' + this._tag);

                this._policy = new Policy(response);
                this._endpoint = 'https://' + response.xAmzBucket + '.s3.amazonaws.com/';

            },
            errorResponse => { throw new Error('Unable to grab credentials in ' + this._tag); }

            );

    }
}
