const mongoose = require('mongoose');
const Shema = mongoose.Schema ;

const   Ratings = new Shema({

    rating:{
        type:Number
    
    },
    number:{
        type:Number
    }
    
});



module.exports = Item = mongoose.model('Item', Ratings);
