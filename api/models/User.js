//api/models/user.js
var baseModel = require('./BaseModel'),
    _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'user',
    attributes: {
        
			
				id : { type: 'INTEGER', primaryKey: true, autoIncrement: true },				
			
        
			  
				name : { type: 'STRING' },		  
        
			  
				username : { type: 'STRING' },		  
        
			  
				password : { type: 'STRING' },		  
        
			  
				expires : { type: 'datetime' },		  
        
			  
				email : { type: 'STRING' },		  
        
			  
				customer : { type: 'INTEGER' },		  
        
			  
				groupId : { type: 'INTEGER' },		  
        
			  
				location : { type: 'INTEGER' },		  
        
			  
				unit : { type: 'tinyint' },		  
        
			  
				isManager : { type: 'tinyint' },		  
        
			  
				isITAdmin : { type: 'tinyint' },		  
        
			  
				isBeerBoardManager : { type: 'tinyint' },		  
        
			  
				lastCustomer : { type: 'INTEGER' },		  
        
			  
				notifyOnProductRequest : { type: 'tinyint' },		  
        
			  
				notifyOnLocationStatus : { type: 'tinyint' },		  
        
			  
				emailReports : { type: 'tinyint' },		  
        
			  
				mobile : { type: 'STRING' },		  
        
			  
				carrier : { type: 'STRING' },		  
        
			  
				showRewards : { type: 'tinyint' },		  
        
			  
				platform : { type: 'INTEGER' },		  
        
    },
    // Lifecycle Callbacks
	//Commented as there is no requirement of this in Beerboard Database design
    beforeCreate: function (values, cb) {
        //values.Code = sails.uuid();
        //values.CreatedAt = sails.moment().format();
        //values.ModifiedAt = sails.moment().format();
        //values.UpdateCount = 1;
        if (values.hasOwnProperty('Code')) {
            /* ignore */
        } else {
            //values.Code = sails.uuid.uuid();
        }
        return cb();
    }
});