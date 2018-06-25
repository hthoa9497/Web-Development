<<<<<<< refs/remotes/origin/master
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

=======
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

>>>>>>> distributed
module.exports = router;