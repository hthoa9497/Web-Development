var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var loadProduct = require('./loadProductController');
var menuTags = require('./tagsMenuContronller');



/* GET home page. */
router.get('/', loadProduct.loadHomeProduct);
//GET products page
router.get('/products', loadProduct.loadAllProduct);
//GET product detail page
router.get('/products/productDetail/:brand/:id' ,loadProduct.loadDetailProduct);
//GET catalog product page
router.get('/product/category-products/:id/:name', loadProduct.loadCategoryProduct),
//GET brand product page
router.get('/products/brand/:id/:name',loadProduct.loadBrandProduct);

//GET about page
router.get('/about', menuTags.aboutTag);
//GET faqs page
router.get('/faqs', menuTags.FAQsTag);
//GET checkout page
router.get('/checkout', menuTags.checkoutTag);
//GET contactus page
router.get('/contactus', menuTags.contactusTag);
module.exports = router;