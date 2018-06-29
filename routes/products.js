var express = require('express');
var router = express.Router();
var app = require('../app.js');
var productController = require('../controller/productController');
var AuthenticationController = require('../controller/AuthenticationController');


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
//Remove from cart
router.get('/shoppingCart/remove/:id', productController.removeProductFromCart);
//Increase 
router.get('/shoppingCart/increase/:id', productController.increaseProductFromCart);
//Decrease
router.get('/shoppingCart/decrease/:id', productController.decreaseProductFromCart);
//shopping cart
router.get('/shoppingCart', productController.shoppingCartPage);
//checkout-get
router.get('/shoppingCart/checkout',AuthenticationController.isLoggedIn, productController.checkoutPage);
//checkout-post
router.post('/shoppingCart/checkout', AuthenticationController.isLoggedIn, productController.orderProduct);
module.exports = router;