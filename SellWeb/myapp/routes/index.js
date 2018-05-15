var express = require('express');
var router = express.Router();
var Product = require("../models/product.js");
var Category = require("../models/category.js");
var async = require('async');
var bodyParser = require('body-parser');
var app = require('../app.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Categories = {};
var categoryChuck = [];
Category.find(function(err,docs){
   if(err) throw err;
   else{
    Categories=docs;
    categoryChuck.push(Categories.slice(0,Categories.length));
  }
});

/* GET home page. */
router.get('/', function(req,res)
{
  Product.find(function(err,docs){ 
    var productChuck = [];
    var chuckSize = 3;
    for(var i=0 ; i<6 ; i+=chuckSize){
      productChuck.push(docs.slice(i, i+chuckSize));
    }
    res.render('index',{title: 'Shoes-shop', Products: productChuck, Categories: categoryChuck})
  });
});

//GET products page
router.get('/products',function(req, res, next){
  Product.find(function(err,docs){ 
      var productChuck = [];
      var chuckSize = 3;
      for(var i=0 ; i<docs.length ; i+=chuckSize){
        productChuck.push(docs.slice(i, i+chuckSize));
      }
      res.render('products',{title: 'Shoes-shop', Products: productChuck, Categories: categoryChuck})
  });
});

//GET product detail page
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
    res.render('productdetail',{title:'Product detail',
    productdetail: result.two,
    relativeproduct: productChuck,
    Categories: categoryChuck});
  });
});

//GET about
router.get('/about', function(req,res,next){
    res.render('about', {title: 'about us', Categories: categoryChuck});
});

//GET faqs
router.get('/faqs', function(req,res,next){
  res.render('faqs', {title: "FAQs", Categories: categoryChuck});
});

//GET checkout
router.get('/checkout', function(req,res,next){
  res.render('checkout', {title: "Checkout", Categories: categoryChuck});
});

//GET shoppingcart
router.get('/contactus', function(req,res,next){
  res.render('contact', {title: "Contactus", Categories: categoryChuck});
});

//GET catalog product
router.get('/product/category-products/:id/:name', function(req,res,next){
  var IDCategory = req.params.id;
  var name = req.params.name;
  switch(IDCategory){
    case 'nam':{
      Product.find({categoryID: 'nam'}, function(err,Products){
        if(err) throw err;
        else
        var productChuck = [];
          productChuck.push(Products.slice(0,Products.length));
          res.render('category-products', {title: 'Category-Products',categoryProducts: productChuck, Name: name,
          Categories: categoryChuck});
      })
    break;
    }
    case 'nu':{
      Product.find({categoryID: 'nu'}, function(err,Products){
        if(err) throw err;
        else
        console.log(Products);
        var productChuck = [];
          productChuck.push(Products.slice(0,Products.length));
          res.render('category-products', {title: 'Category-Products',categoryProducts: productChuck, Name: name, Categories: categoryChuck});
      })
    break;
    }
  }
})
module.exports = router;