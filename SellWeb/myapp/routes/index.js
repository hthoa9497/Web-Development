var express = require('express');
var router = express.Router();
var Product = require("../models/product.js");
var async = require('async');
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// products
router.get('/products',function(req, res, next){
  Product.find(function(err,docs){ 
      var productChuck = [];
      var chuckSize = 3;
      for(var i=0 ; i<docs.length ; i+=chuckSize){
        productChuck.push(docs.slice(i, i+chuckSize));
      }
      res.render('products',{title: 'Shoes-shop', Products: productChuck})
  });
});

//product detail
router.get('/products/productDetail/:brand/:id' ,function(req,res,next){
  async.parallel({
    two:function(callback){
          Product.find({_id: req.params.id},function(err,aProduct){
            if(err) throw err;
            else
              callback(null,aProduct);
          })
        },
    one:function(callback){
          Product.find({brand: req.params.brand},function(err,relativeProduct){
            if(err) throw err;
            else
              callback(null,relativeProduct);
          })
        },
  },
  function(err, result){
    var productChuck = [];
    productChuck.push(result.one.slice(0,3));
    console.log(productChuck);
    res.render('productdetail',{title:'Product detail', productdetail: result.two, relativeproduct: productChuck});
  });
});
module.exports = router;