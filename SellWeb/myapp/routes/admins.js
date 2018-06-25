<<<<<<< refs/remotes/origin/master
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
=======
var express = require('express');
var router = express.Router();
var app = require('../app.js');
var AdminController = require('../controller/AdminController');
/*Get Admin home page */
router.get('/', function(req, res){
    res.render('Admin/index', {title: "Admin", layout: 'layoutAdmin'});
});
//Info Admin account
router.post
//Get page product Admin
router.get('/productTable', AdminController.loadProductTable);
router.get('/productTable/delete/:id', AdminController.deleteProduct);
router.get('/productTable/edit/:id', AdminController.editProduct_Get);
router.post('/productTable/edit/:id', AdminController.editProduct_Post);
router.get('/productTable/create', AdminController.createProduct_Get);
router.post('/productTable/create', AdminController.createProduct_Post);
//Get page brand Admin
router.get('/brandTable', AdminController.loadBrandTable);
router.get('/brandTable/delete/:id', AdminController.deleteBrand_page);
router.get('/brandTable/delete/deleteBrandProduct/:id/:brand', AdminController.deleteBrandProduct);
router.get('/brandTable/deleteBrand/:id',AdminController.deleteBrand );
router.get('/brandTable/create', AdminController.createBrand_Get);
router.post('/brandTable/create', AdminController.createBrand_Post);
//Get page user 
router.get('/userTable', AdminController.loadUserInfo);
router.delete('/userTable/delete/:id', AdminController.deleteUserInfo);
>>>>>>> distributed
module.exports = router;