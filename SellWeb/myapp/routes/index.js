var express = require('express');
var router = express.Router();
var app = require('../app.js');
var bodyParser = require('body-parser');
var productController = require('../controller/productController');
var menuTags = require('../controller/tagsMenuContronller');
var productAdminController = require('../controller/productAdminController');
var brandAdminController = require('../controller/brandAdminController');



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
//Get page product Admin
router.get('/adminHome/productTable', productAdminController.loadProductTable);
router.get('/adminHome/productTable/:id/delete', productAdminController.deleteProduct);
router.get('/adminHome/productTable/:id/edit', productAdminController.editProduct_Get);
router.post('/adminHome/productTable/:id/edit', productAdminController.editProduct_Post);
router.get('/adminHome/productTable/create', productAdminController.createProduct_Get);
router.post('/adminHome/productTable/create', productAdminController.createProduct_Post);
//Get page brand Admin
router.get('/adminHome/brandTable', brandAdminController.loadBrandTable);
router.get('/adminHome/brandTable/:id/delete', brandAdminController.deleteBrand_page);
router.get('/adminHome/brandTable/:id/:brand/deleteBrandProduct', brandAdminController.deleteBrandProduct);
router.get('/adminHome/brandTable/:id/deleteBrand',brandAdminController.deleteBrand );
router.get('/adminHome/brandTable/create', brandAdminController.createBrand_Get);
router.post('/adminHome/brandTable/create', brandAdminController.createBrand_Post);
    //router.get('/adminHome/brandTable/:id/edit', productAdminController.editProduct_Get);
module.exports = router;
 