var express = require('express');
var mongoosex = require('mongoose');
var testDb = require('./testDb');

var bodyParser = require('body-parser');
//var multer = require('multer'); 


var app = express();


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




var server = app.listen(80, function () {

// Connection URL
//var url = 'mongodb://0.0.0.0:27017/myproject';
var url = 'mongodb://root:root@ds047772.mongolab.com:47772/mymongodb'
mongoosex.connect(url);




var host = server.address().address;
var port = server.address().port;
console.log('Example app listening at http://%s:%s', host, port);

});


