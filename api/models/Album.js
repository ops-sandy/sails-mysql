//api/models/Album.js
var baseModel = require('./BaseModel'),
    _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'Album',
    attributes: {
        
			
				AlbumId : { type: 'int', primaryKey: true, autoIncrement: true },				
			
        
			  
				Title : { type: 'varchar' },		  
        
			  
				ArtistId : { type: 'int' },		  
        
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