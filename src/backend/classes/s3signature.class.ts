import * as CryptoJS from "crypto-js";

class S3signature {
    private serviceName = 's3';
    // Config
    //TODO move this to configuration location
    private accessKeyId = 'AKIAIFJZ3A2GHIGHUJOQ';
    private folder = 'files';
    private region = 'eu-west-1';
    private secretAccessKey = '2POh3BlPo7yOs8BKcdgokja2Aqycur4hAD0Js7tk';
    private xAmzBucket = 'connecthealthweb';

    // Policy credentials
    private xAmzDate = this.buildTimestamp();
    private xAmzDateWSuffix = this.xAmzDate +  'T000000Z';
    private xAmzServerSideEncryption = 'AES256';
    private xAmzAlgorithm = "AWS4-HMAC-SHA256";
    private xAmzAcl = "public-read";
    private expiration = '2020-01-01T12:00:00.000Z';
    private xAmzMetaUuid = '14365123651274';    
    private xAmzCredential = this.accessKeyId + "/" + this.xAmzDate + "/" + this.region + "/" + this.serviceName + "/aws4_request";

    private policy = {
      "expiration": this.expiration,
      "conditions": [
        {"bucket": this.xAmzBucket},
        ["starts-with", "$key", this.folder + "/"],
        {"acl": this.xAmzAcl},
        ["starts-with", "$Content-Type", ""],
        {"x-amz-server-side-encryption": this.xAmzServerSideEncryption},
        {"x-amz-credential": this.xAmzCredential},
        {"x-amz-algorithm": this.xAmzAlgorithm},    
        {"x-amz-meta-uuid": this.xAmzMetaUuid},
        {"x-amz-date": this.xAmzDateWSuffix }
      ]
    };
    private base64Policy;
    private signatureKey;
    private s3Signature;

    constructor() {
        this.base64Policy = new Buffer(JSON.stringify(this.policy), "utf-8").toString("base64");
        this.signatureKey = this.getSignatureKey(this.secretAccessKey, this.xAmzDate, this.region, this.serviceName);
        this.s3Signature = CryptoJS.HmacSHA256(this.base64Policy, this.signatureKey).toString();

    }

    buildTimestamp(){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        return year + month + day;
    }

    getSignatureKey(key, dateStamp, regionName, serviceName) {
       var kDate = CryptoJS.HmacSHA256(dateStamp, "AWS4" + key);
       var kRegion = CryptoJS.HmacSHA256(regionName, kDate);
       var kService = CryptoJS.HmacSHA256(serviceName, kRegion);
       var kSigning = CryptoJS.HmacSHA256("aws4_request", kService);

       return kSigning;
    }

    getSignature(){
        return {
            s3Signature: this.s3Signature,
            signatureKey: this.signatureKey,
            base64Policy: this.base64Policy,
            accessKeyId: this.accessKeyId,
            folder: this.folder,
            xAmzDate: this.xAmzDateWSuffix,
            xAmzCredential: this.xAmzCredential,
            xAmzAlgorithm: this.xAmzAlgorithm,
            xAmzServerSideEncryption: this.xAmzServerSideEncryption,
            xAmzAcl: this.xAmzAcl,
            xAmzBucket: this.xAmzBucket,
            xAmzMetaUuid: this.xAmzMetaUuid
        };
    }

}

export { S3signature };

