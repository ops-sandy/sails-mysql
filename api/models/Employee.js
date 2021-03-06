//api/models/Employee.js
var baseModel = require('./BaseModel'),
    _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'Employee',
    attributes: {
        
			
				EmployeeId : { type: 'int', primaryKey: true, autoIncrement: true },				
			
        
			  
				LastName : { type: 'varchar' },		  
        
			  
				FirstName : { type: 'varchar' },		  
        
			  
				Title : { type: 'varchar' },		  
        
			  
				ReportsTo : { type: 'int' },		  
        
			  
				BirthDate : { type: 'datetime' },		  
        
			  
				HireDate : { type: 'datetime' },		  
        
			  
				Address : { type: 'varchar' },		  
        
			  
				City : { type: 'varchar' },		  
        
			  
				State : { type: 'varchar' },		  
        
			  
				Country : { type: 'varchar' },		  
        
			  
				PostalCode : { type: 'varchar' },		  
        
			  
				Phone : { type: 'varchar' },		  
        
			  
				Fax : { type: 'varchar' },		  
        
			  
				Email : { type: 'varchar' },		  
        
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