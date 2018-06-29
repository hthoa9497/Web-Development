

var brand=require('../models/brand.js');
var mongoose = require('mongoose');
mongoose.connect("mongodb://hthoa:t01655766369h@ds161901.mlab.com:61901/sellweb");

var async = require('async')
var Brand=require('../models/brand.js');
var Category=require('../models/category.js');
var Product = require('../models/product.js');

// var mongoose = require('mongoose');
// var mongoDB = userArgs[0];
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = [];
var brands =[];

function categoryCreate(name, cb) {
  let categoryDetail = {
    name: name
  }
  
  var category = new Category(categoryDetail);
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }

    // console.log('New Author: ' + author);
    categories.push(category)
    cb(null, category)
  });
}

function brandCreate(name, cb) {
  let brandDetail = {
    name: name
  }
  
  var brand = new Brand(brandDetail);
       
  brand.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }

    // console.log('New Author: ' + author);
    brands.push(brand)
    cb(null, brand)
  });
}

function productCreate(name, brand, price, quantity, availability, image_link, description, sells, categoryID, cb) {
    let productDetail = {
      name: name,
      brand: brand,
      price: price,
      quantity: quantity,
      availability: availability,
      image_link: image_link,
      description: description,
      sells: sells,
      categoryID: categoryID,
    }
    var product = new Product(productDetail);
    product.save(function (err) {
     if (err) {
       cb(err, null)
       return
    }
  
      // console.log('New Author: ' + author);
    //   authors.push(author)
      cb(null, product)
    });
  }

function createCategories(cb) {
    async.parallel([
        function(callback) {
          categoryCreate('nam', callback);
        },
        function(callback) {
          categoryCreate('nữ', callback);
          }
        ],
        // optional callback
        cb);
}

function createBrands(cb) {
  async.parallel([
      function(callback) {
        brandCreate('Nike', callback);
      },
      function(callback) {
        brandCreate('Adidas', callback);
      },
      function(callback) {
        brandCreate('Bitis', callback);
      },
      ],
      // optional callback
      cb);
}

console.log(brands);
function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate( "Biti's Hunter Dark Tribal", brands[2],680000 ,3,true,"images/product/Biti'sHunterDarkTribal.jpg",  "Giày thế thao nữ Biti's Hunter Dark Tribal Baby Blue DSW057333XDG",5, categories[1], callback);
        },
        function(callback) {
          productCreate( "HUNTER X Midnight Black ", brands[2],899000 ,4,true,"images/product/Biti'sHunter-X-Midnight-Black.jpg", "Hunter Nam Midnight X2 BLACK",8, categories[0], callback);
        },
        function(callback) {
          productCreate( "HUNTER X Midnight Black 35BS ", brands[2],888000 ,4,true,"images/product/Hunter-X-Midnight-Black-nu.jpg", "Biti's Hunter Nữ X2 Midnight BLACK",6, categories[1], callback);
        },
        function(callback) {
          productCreate( "Adidas Men's Alphabounce", brands[1],2316000 ,6,true,"images/product/Adidas-Men's-Alphabounce.jpg", "Giày thể thao nam Adidas Men Alphabounce EM BB9043",10, categories[0], callback);
        },
        function(callback) {
          productCreate( "Bruce Brainard BB1512", brands[1],1100000 ,6,true,"images/product/Bruce-Brainard.jpg", "Giày adidas women's bruce brainard bb1522 nữ",2, categories[1], callback);
        },
        function(callback) {
          productCreate(  "Nike Air Max 97 OG QS Silver Bullet", brands[0],4000000 ,15,true,"images/product/Nike-Air-Max-97-OG-QS-Silver-Bullet.jpg", "Giày thể thao Nike Air Max 97 OG QS Silver Bullet 884421-001",9, categories[0], callback);
        },
        function(callback) {
          productCreate(  "Nike Air Max Zero", brands[0],3000000 ,7,true,"images/product/NikeAirMaxZero.png", "Giày thể thao nữ Nike Air Max Zero - Xanh Ngọc - NKW754.", 4, categories[1], callback);
        },
        function(callback) {
          productCreate(  "Nike Dunk HIGH", brands[0],5100000 ,6,true,"images/product/Nike-Dunk-HIGH.jpg",  "Nike Dunk HIGH (GS) Grade School Shoes.", 11, categories[0], callback);
        },
        function(callback) {
          productCreate(  "Nike Men's Air Force 1 Basketball", brands[0],2800000 ,10,true,"images/product/NikeMen'sAirForce.jpg",  "Nike Men's Air Force 1 Basketball Shoes.", 13, categories[1], callback);
        },
      ],
        // optional callback
    cb);
}



async.series([
  createCategories,
  createBrands,
  createProducts,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




