var express = require('express');
var router = express.Router();
var app = require('../app.js');
var productAdminController = require('../controller/productAdminController');
var brandAdminController = require('../controller/brandAdminController');
/*Get Admin home page */
router.get('/', function(req, res){
    res.render('Admin/index', {title: "Admin", layout: 'layoutAdmin'});
});
//Info Admin account
router.post
//Get page product Admin
router.get('/productTable', productAdminController.loadProductTable);
router.get('/productTable/:id/delete', productAdminController.deleteProduct);
router.get('/productTable/:id/edit', productAdminController.editProduct_Get);
router.post('/productTable/:id/edit', productAdminController.editProduct_Post);
router.get('/productTable/create', productAdminController.createProduct_Get);
router.post('/productTable/create', productAdminController.createProduct_Post);
//Get page brand Admin
router.get('/brandTable', brandAdminController.loadBrandTable);
router.get('/brandTable/:id/delete', brandAdminController.deleteBrand_page);
router.get('/brandTable/:id/:brand/deleteBrandProduct', brandAdminController.deleteBrandProduct);
router.get('/brandTable/:id/deleteBrand',brandAdminController.deleteBrand );
router.get('/brandTable/create', brandAdminController.createBrand_Get);
router.post('/brandTable/create', brandAdminController.createBrand_Post);
    //router.get('/adminHome/brandTable/:id/edit', productAdminController.editProduct_Get);
module.exports = router;