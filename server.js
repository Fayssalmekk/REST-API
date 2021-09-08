const   express = require('express');
const   mongoose = require('mongoose');
const   bodyParser = require('body-parser');

const items = require('./routes/api/items');
const users = require('./routes/api/users');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require('./config/keys').mongoURI ;

mongoose
        .connect(db)
        .then( ()=> console.log('MDB Connected'))
        .catch( err=> console.log(err));

app.use('/api/items',items);     
app.use('/api/users', users);      
     
const port = process.env.PORT || 5000 ;

app.listen(port , ()=> console.log(`server started on port ${port}`));



