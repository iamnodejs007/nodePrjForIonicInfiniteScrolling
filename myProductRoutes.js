var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



var Schema = mongoose.Schema; 

var Product = new Schema({  
    title: { type: String, required: true },  
    description: { type: String, required: true },  
    style: { type: String},  
    modified: { type: Date, default: Date.now }
});

var ProductModel = mongoose.model('Product', Product);  

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});



 
//READ a List of Products with limit

router.get('/products', function (req, res){ 


    console.log( "lastIdxxx..." + req.query.lastId );

  var callback = function (err, products) {
        if (!err) {
          console.log("size:" + products.length);
          return res.send(products);
        } else {
          return console.log(err);
        }
  }

  if (req.query.lastId == '0'){

      console.log('..........1111');

      return ProductModel.find().
      limit(req.query.limit).
      exec(callback);
 
  }
  else{
      console.log('..........222222');
      var lastId = req.query.lastId;
      return ProductModel.find().
      where('_id').gt(lastId).
      limit(req.query.limit).
      exec(callback);

  }
  
});

//CREATE a Single Product

router.post('/products', function (req, res){
  var product;
  //console.log("POST: ");
  console.log("ecchime.." + req.params);
  product = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    style: req.body.style,
  });
  product.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log("errore...." + err);
    }
  });
  return res.send(product);
});


//READ a Single Product by ID
router.get('/products/:id', function (req, res){
  console.log ('READ a Single Product by ID...');
  return ProductModel.findById(req.params.id, function (err, product) {
    if (!err) {
      console.log ('READ a Single Product by ID...' + req.params.id);
      return res.send(product);
    } else {
      return console.log(err);
    }
  });
});


//UPDATE a Single Product by ID

router.post('/products/:id', function (req, res){
  return ProductModel.findById(req.params.id, function (err, product) {
    console.log('update1....' + req.body.id);
    console.log('update2....' + req.params.id);
    product.title = req.body.title;
    product.description = req.body.description;
    product.style = req.body.style;
    return product.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});


//DELETE a Single Product by ID

router.delete('/products/:id', function (req, res){
	//console.log("req.params.id:" + req.params.id);
  return ProductModel.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

module.exports = router;

