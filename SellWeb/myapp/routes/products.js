var express = require('express');
var router = express.Router();
var app = require('../app.js');
var productController = require('../controller/productController');

//GET products page
router.get('/', productController.loadAllProduct);
//GET product detail page
router.get('/productDetail/:brand/:id' ,productController.loadDetailProduct);
//GET catalog product page
router.get('/category-products/:id/:name', productController.loadCategoryProduct),
//GET brand product page
router.get('/brand/:id/:name',productController.loadBrandProduct);
//Search product
router.post('/search', productController.searchProduct);
//Add to cart
router.get('/addToCart/:id', productController.addProductToCart)
//shopping cart
router.get('/shoppingCart', productController.shoppingCartPage);
//checkout
router.get('/shoppingCart/checkout', productController.checkoutPage);
module.exports = router;