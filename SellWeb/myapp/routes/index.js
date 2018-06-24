var express = require('express');
var router = express.Router();
var app = require('../app.js');
var bodyParser = require('body-parser');
var menuTags = require('../controller/tagsMenuContronller');
var productController = require('../controller/productController');

/* GET home page. */
router.get('/', productController.loadHomeProduct);
//GET about page
router.get('/about', menuTags.aboutTag);
//GET faqs page
router.get('/faqs', menuTags.FAQsTag);
//GET checkout page
router.get('/checkout', menuTags.checkoutTag);
//GET contactus page
router.get('/contactus', menuTags.contactusTag);
module.exports = router;
 