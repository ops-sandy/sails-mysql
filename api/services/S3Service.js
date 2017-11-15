//AWS S3 Document Service - Starts
var AWS = require('aws-sdk');

function configS3() {
    AWS.config.accessKeyId = sails.config.settings.AWS.AccessKey;
    AWS.config.secretAccessKey = sails.config.settings.AWS.SecretKey;
    AWS.config.region = sails.config.settings.AWS.BucketRegion;
};
//Initiallising AWS Configuration
configS3();
//Creating AWS S3 instance
const awsS3 = new AWS.S3({ params: { Bucket: sails.config.settings.AWS.BucketName } });
var response = {};

module.exports = {
    //Function to upload any file to s3 bucket
    uploadFile : function (request, res) {
        try {
            //Step 1: Upload file to Bucket      
            //Forming params object to upload into aws s3 bucket
            var params = {
                Key: request.StorageId + "/" + request.FileName,
                ContentType: request.ContentType,
                Body: request.File,
                ACL: 'public-read',
                Metadata: { 'custom-header': JSON.stringify(request.MetaData) }
            };
            awsS3.putObject(params, function (err, data) {
                response = {};
                if (err) {
                    errorResponseHandler(res, err);
                }
                else {
                    //Step 2: Save document reference to document table
                    DocumentService().save(request.MetaData, res); 
                }                
            });
        } 
        catch (e) {
            errorResponseHandler(res, e);
        };       
    },
    
    //Function to get file url of any object inside s3 bucket
    downloadFileUrl : function (request, res) {
        try {
            //Step 1: Fetch the object url from bucket
            awsS3.getSignedUrl('putObject', { Bucket: sails.config.settings.AWS.BucketName, Key: request.KeyName }, function (err, presignedurl) {
                response = {};
                if (err) {
                    errorResponseHandler(res, err);
                }
                else {
                    response.Success = true;
                    response.Message = sails.config.message.Document.Reterived_Success;
                    response.FileUrl = presignedurl;
                    return res.send(response);
                }               
            });
        } 
        catch (e) {
            errorResponseHandler(res, e);
        };  
    },
    
    //Function to update meta data of any object inside s3 bucket
    updateFile : function (request, res) {
        try {
            var params = {               
                Bucket: sails.config.settings.AWS.BucketName,
                Key: request.body.StorageId + "/" + request.body.FileName                
            }
            //Step 1 : Fetch the exixting object meta data
            awsS3.headObject(params, function (err, data) {
                if (err) {
                    errorResponseHandler(res, err);
                }
                else {
                    //New StorageId
                    request.body.newStorageId = sails.uuid();

                    //Forming Metadata object
                    var metaData = JSON.parse(JSON.parse(data.Metadata["custom-header"]));
                    metaData.RequestCode = request.body.RequestCode;
                    metaData.RequestType = request.body.RequestType;
                    metaData.DocumentTypeCode = request.body.DocumentTypeCode;

                    //Step 2: Copy the existing file into s3 bucket 
                    var copySource = request.body.StorageId + "/" + request.body.FileName;
                  
                    //Params
                    params.Key = request.body.newStorageId + "/" + request.body.FileName;
                    params.CopySource = sails.config.settings.AWS.BucketName + '/' + copySource;
                    params.ACL = 'public-read';
                    params.Metadata = metaData;

                    //Copying object
                    awsS3.copyObject(params, function (err, data) {
                        response = {};
                        if (err) {
                            errorResponseHandler(res, err);
                        }
                        else {
                            //Step 3 : Update the document table
                            DocumentService().update(request.params.id, metaData, res);
                            //Step 4: Delete old file as a background process
                            awsS3.deleteObject({ Bucket: sails.config.settings.AWS.BucketName, Key: copySource }, function (err, data) {
                                if (err) {
                                    sails.log.error(JSON.stringify(err));
                                }
                                else {
                                    sails.log.info("Document updated =>" + JSON.stringify(data));
                                }
                            });
                        }
                    });
                }                
            }); 
        } 
        catch (e) {
            errorResponseHandler(res, e);
        }; 
    },

    //Function to delete any object from s3 bucket
    deleteFile: function (req, res) {
        try {
            //Step 1: Delete record from document table
            DocumentService().delete(req.params.id, res);

            //Step 2 : Delete the file form s3 bucket as a background process
            var sourceFilePath = req.body.StorageId + "/" + req.body.FileName;
            awsS3.deleteObject({ Bucket: sails.config.settings.AWS.BucketName, Key: sourceFilePath }, function (err, data) {
                if (err) {
                    sails.log.error(JSON.stringify(err));
                }
                else {
                    sails.log.info("Document deleted with id =>" + req.params.id + "Path =>" + sourceFilePath);                
                }
            });    
        }
        catch (e) {
            errorResponseHandler(res, e);
        };      
    }        
};

function errorResponseHandler(res, err) {
    response = {};
    response.Success = false;
    response.Message = err;
    sails.log.error(JSON.stringify(err));
    return res.send(response);
};

//AWS S3 Document Service - Ends