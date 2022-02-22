const mongoose = require('mongoose');
const Shema = mongoose.Schema ;

const   Ratings = new Shema({

   	    "version": {
	          type: String
	        },
	    "groupKey": {
		          type: String
		        },
	    "truncatedAlerts": {
		          type: Number
		        },
	    "status": {
		    type: String
		        },
	    "receiver": {
		    type: String
		        },
	    "groupLabels": {
		    type: Object
		        },
	    "commonLabels": {
		     type: Object
		        },
	    "commonAnnotations": {
		        type: Object
		        },
	    "externalURL": {
		       type: String
		        },
	    "alerts": {
		          type: Array,
		          items: {}
		        }
    
});



module.exports = Prom = mongoose.model('Prom', Ratings);
