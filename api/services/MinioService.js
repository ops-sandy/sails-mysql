//Minio Document Service -Starts
var Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: sails.config.settings.Minio.EndPoint,
    port: sails.config.settings.Minio.Port,
    secure: sails.config.settings.Minio.Secure,
    accessKey: sails.config.settings.Minio.AccessKey,
    secretKey: sails.config.settings.Minio.SecretKey
});

const bucketName_Minio = sails.config.settings.Minio.BucketName;

var response = {};

module.exports = {
    uploadFile : function (request, res){
        try {
            //Step 1: Upload file to Bucket
            var filePath = request.StorageId + '/' + request.FileName;
            minioClient.putObject(bucketName_Minio, filePath, request.File, request.ContentType , function (err, etag) {
                response = {};
                if (err) {
                    return res.send(response);
                }
                else {
                    //Step 2: Save document reference to document table
                    DocumentService().save(request.MetaData, res);
                    //response.Etag = etag;
                }
            });
        }
        catch (e) {
            errorResponseHandler(res, e);
        };
    },

    downloadFileUrl : function (request, res){
        try {
            //Step 1: Fetch the file url from bucket
            minioClient.presignedGetObject(bucketName_Minio, request.KeyName, sails.config.settings.Minio.FileLinkExpiryTime, function (err, presignedurl) {
                response = {};
                if (err) {
                    errorResponseHandler(res, err);
                }
                else {
                    response.Success = true;
                    response.Message = sails.config.message.Account.Reterived_Success;
                    response.FileUrl = presignedurl;
                    return res.send(response);
                }               
            });
        }
        catch (e) {
            errorResponseHandler(res, e);
        };
    },
    updateFile : function (request, res) {
        try {
            //Step 1: Create Update request object
            var updateRequest = {};
            updateRequest.RequestCode = request.body.RequestCode;//Should come from client
            updateRequest.RequestType = request.body.RequestType;//Should come from client
            updateRequest.DocumentTypeCode = request.body.DocumentTypeCode;//Should come from client
            //Step 2: Update the document table
            DocumentService().update(request.params.id, updateRequest, res);
        } 
        catch (e) {
            errorResponseHandler(res, e);
        };
    },

    deleteFile: function (req, res) {
        try {
            //Step 1: Delete record from document table
            DocumentService().delete(req.params.id, res);

            //Step 2 : Delete the file form minio bucket as a background process
            var sourceFilePath = req.body.StorageId + "/" + req.body.FileName;
            minioClient.removeObject(bucketName_Minio, sourceFilePath , function (err) {
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


//Minio Document Service -Ends
