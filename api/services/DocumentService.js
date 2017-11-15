module.exports = function (DocumentProvider) {
    //when Document Provider is not passed from client via document-provider header
    if (!DocumentProvider)
        //Getting Document Provider Name
        DocumentProvider = sails.config.settings.App.DocumentProvider;

    var documentService = require('./' + DocumentProvider + 'Service.js');
    
    var response = {};
    
    //Function to save file information into document table
    documentService.save = function (request, res) {
        try {
            response = {};
            sails.models.document.create(request).exec(function (err, result) {
                if (err) {
                    errorResponseHandler(res, err);
                }
                else {
                    response.Success = true;
                    response.Message = sails.config.message.Document.Upload_Success;
                    res.send(response);
                }              
            });     
        }
        catch (e) {
            errorResponseHandler(res, err);
        };
    };
    
    //Function to update file information into document table
    documentService.update = function (ID, request, res) {
        try {
            response = {};
            sails.models.document.update({ 'Id': ID }, request).exec(function (err, result) {
                if (err) {
                    errorResponseHandler(res, err);
                }
                else {
                    response.Success = true;
                    response.Message = sails.config.message.Document.Update_Success;
                    res.send(response);
                }                
            });
        }
        catch (e) {
            errorResponseHandler(res, e);
        };       
    };
    
    //Function to delete file information from document table
    documentService.delete = function (ID, res) {
        try {
            response = {};
            sails.models.document.destroy({ "Id" : ID }).exec(function (err, result) {
                if (err) {
                    errorResponseHandler(res, err);
                }
                else {
                    response.Success = true;
                    response.Message = sails.config.message.Document.Delete_Success;
                    res.send(response);
                }
            });
        }
        catch (e) {
            errorResponseHandler(res, e);
        };       
    };    

    return documentService;
};

function errorResponseHandler(res, err) {
    response = {};
    response.Success = false;
    response.Message = err;
    sails.log.error(JSON.stringify(err));
    return res.send(response);
};