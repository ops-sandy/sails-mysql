//api/models/Track.js
var baseModel = require('./BaseModel'),
    _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'Track',
    attributes: {
        
			
				TrackId : { type: 'int', primaryKey: true, autoIncrement: true },				
			
        
			  
				Name : { type: 'varchar' },		  
        
			  
				AlbumId : { type: 'int' },		  
        
			  
				MediaTypeId : { type: 'int' },		  
        
			  
				GenreId : { type: 'int' },		  
        
			  
				Composer : { type: 'varchar' },		  
        
			  
				Milliseconds : { type: 'int' },		  
        
			  
				Bytes : { type: 'int' },		  
        
			  
				UnitPrice : { type: 'decimal' },		  
        
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