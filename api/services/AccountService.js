var jwt = require('jsonwebtoken');

module.exports = {
    //Function to Generate JWT Token
    issueJwtToken : function (request) {
        var jwtToken = {};
        var token = {};
        //Forming request object to generate jwt token
        jwtToken.Code = request.Code;
        jwtToken.Email = request.Email;
        jwtToken.RoleCode = request.RoleCode;      
        jwtToken.UserTypeCode = request.UserTypeCode;
        jwtToken.Status = request.Status;
        //Generating token
        token.Access_Token = jwt.sign(jwtToken, sails.config.settings.Security.JwtSecurityKey, {
            expiresIn: sails.config.settings.Security.JwtTokenExpiryTime
        });
        token.Expires_In_Sec = sails.config.settings.Security.JwtTokenExpiryTime;
        return token;
    },

    validateJwtToken: function (request) {

    },

    refreshJwtToken: function (request) {

    }
};