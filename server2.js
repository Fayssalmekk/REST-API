const   express = require('express');
const   mongoose = require('mongoose');
const   bodyParser = require('body-parser');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const proms = require('./routes/api/proms');

const app = express();

const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({
     app: 'node-application-monitoring-app',
     prefix: 'node_',
     timeout: 10000,
     gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
     register
});

app.get('/metrics', async (req, res) => {
	    res.setHeader('Content-Type', register.contentType);
	    res.send(await register.metrics());
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require('./config/keys').mongoURI ;

mongoose
        .connect(db)
        .then( ()=> console.log('MDB Connected'))
        .catch( err=> console.log(err));

app.use('/api/items',items);     
app.use('/api/users', users);
app.use('/api/proms', proms);
     
const port = process.env.PORT || 5000 ;

app.listen(port , ()=> console.log(`server started on port ${port}`));



