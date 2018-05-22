var express = require('express');
var router = express.Router();
var app = require('../app.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var productController = require('../controller/productController');
var adminController = require('../controller/adminController');
var menuTags = require('../controller/tagsMenuContronller');
var productAdminController = require('../controller/productAdminController');



/* GET home page. */
router.get('/', productController.loadHomeProduct);
//GET products page
router.get('/products', productController.loadAllProduct);
//GET product detail page
router.get('/products/productDetail/:brand/:id' ,productController.loadDetailProduct);
//GET catalog product page
router.get('/product/category-products/:id/:name', productController.loadCategoryProduct),
//GET brand product page
router.get('/products/brand/:id/:name',productController.loadBrandProduct);
//GET about page
router.get('/about', menuTags.aboutTag);
//GET faqs page
router.get('/faqs', menuTags.FAQsTag);
//GET checkout page
router.get('/checkout', menuTags.checkoutTag);
//GET contactus page
router.get('/contactus', menuTags.contactusTag);


/*Get Admin home page */
router.get('/adminHome', function(req, res){
    res.render('Admin/index', {title: "Admin", layout: 'layoutAdmin'});
});
router.get('/adminHome/dataTable/productData', adminController.loadProductTable);
router.get('/adminHome/dataTable/productData/:id/delete', urlencodedParser, productAdminController.deleteProduct);
module.exports = router;
