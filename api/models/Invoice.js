//api/models/Invoice.js
var baseModel = require('./BaseModel'),
    _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'Invoice',
    attributes: {
        
			
				InvoiceId : { type: 'int', primaryKey: true, autoIncrement: true },				
			
        
			  
				CustomerId : { type: 'int' },		  
        
			  
				InvoiceDate : { type: 'datetime' },		  
        
			  
				BillingAddress : { type: 'varchar' },		  
        
			  
				BillingCity : { type: 'varchar' },		  
        
			  
				BillingState : { type: 'varchar' },		  
        
			  
				BillingCountry : { type: 'varchar' },		  
        
			  
				BillingPostalCode : { type: 'varchar' },		  
        
			  
				Total : { type: 'decimal' },		  
        
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