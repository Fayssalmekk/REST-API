const mongoose = require('mongoose');
const Shema = mongoose.Schema ;



const Users = new Shema({

    username:{
        type:String,
        unique: 1,
        required : true
    
    },
    email:{
        type:String,
        unique: 1,
        required : true
    },
    password:{
        type:String,
      
        required : true
    }
});


module.exports = User = mongoose.model('User', Users);