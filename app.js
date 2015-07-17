var express = require('express');
var mongoosex = require('mongoose');
var testDb = require('./testDb');

var bodyParser = require('body-parser');
//var multer = require('multer'); 


var app = express();

app.set('port', (process.env.PORT || 5000));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data




var products = require('./myProductRoutes');
app.use('/api', products);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  var url = 'mongodb://root:root@ds047772.mongolab.com:47772/mymongodb'
   mongoosex.connect(url);
});




