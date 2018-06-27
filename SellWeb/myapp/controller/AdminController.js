var Brand = require('../models/brand');
var async = require('async');
var Product = require("../models/product.js");
var User = require("../models/user");
var Order = require("../models/order");
var Cart = require("../models/cart");
var loadMenu = require('./loadMenu')
const {check, validationResult} = require('express-validator/check');


var brandAdminController = {
    //*******************PRODUCT*******************/
    //LOAD PRODUCT
    loadProductTable: function(req,res){
        var productChuck = [];
        Product.find().populate('categoryID').populate('brand').exec(function(err,products){
            if(err) throw err;
            else{
                productChuck.push(products.slice(0,products.length));   
                res.render('Admin/productTable', {title: "Admin", layout: 'layoutAdmin', Products: productChuck});
            }
        })
    },
    //DELETE PRODUCT
    deleteProduct: function(req,res){
        Product.findByIdAndRemove(req.params.id, function(err){
            if(err) throw err;
            else
                res.redirect('/adminHome/productTable');
        })
    },
    //EDIT PRODUCT
    editProduct_Get: function(req,res){
        var categoryChuck = [];
        var brandChuck = [];
        async.parallel({
            one: function(callback){
                loadMenu.loadBrandMenu().then(result => {
                    brandChuck.push(result.slice(0,result.length))
                    callback(null, brandChuck);
                });
            },
            two: function(callback){
                loadMenu.loadCategoryMenu().then(result => {
                    categoryChuck.push(result.slice(0,result.length))
                    callback(null,categoryChuck);
                });
            }
        },
        function(err,result){
            if(err) throw err;
            Product.findById(req.params.id, function(err, docs){
                if(err) throw err;
                else
                    res.render('Admin/editProductForm', {title: "edit product form", layout: 'layoutAdmin', Product: docs,Categories: result.two, Brands: result.one})
            })
        })
    },
    editProduct_Post: function(req,res){
        var editProduct = new Product({
            _id: req.params.id,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            quantity: req.body.quantity,
            description: req.body.description,
            categoryID: req.body.categoryID,
        });
        Product.findByIdAndUpdate(req.params.id, editProduct, function(err){
            if(err) throw err;
            else
             res.redirect('/adminHome/productTable');
        })
    },
    //CREATE PRODUCT
    createProduct_Get: function(req,res){
        var categoryChuck = [];
        var brandChuck = [];
        async.parallel({
            one: function(callback){
                loadMenu.loadBrandMenu().then(result => {
                    brandChuck.push(result.slice(0,result.length))
                    callback(null, brandChuck);
                });
            },
            two: function(callback){
                loadMenu.loadCategoryMenu().then(result => {
                    categoryChuck.push(result.slice(0,result.length))
                    callback(null,categoryChuck);
                });
            }
        },
        function(err,result){
            if(err) throw err;
            res.render('Admin/createProductForm', {title: 'create product form', layout: 'layoutAdmin', Categories: result.two, Brands: result.one})
        })
    },
    createProduct_Post: function(req,res){
        var newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            quantity: req.body.quantity,
            description: req.body.description,
            categoryID: req.body.categoryID,
            image_link: (`images/product/${req.body.imageName}`),
        });
        newProduct.save(function(err){
            if(err) throw err;
            else
                res.redirect('/adminHome/productTable')
        })
    },
    //*****************************BRAND*******************************
    //LOAD BRAND
    loadBrandTable: function(req,res){
        var brandChuck = [];
        Brand.find(function(err,docs){
            if(err) throw err;
            else{
                brandChuck.push(docs.slice(0,docs.length));
                console.log(brandChuck);
            }
            res.render('Admin/brandTable', {title: "Brand Admin table", layout: 'layoutAdmin', Brands: brandChuck});
        });
    },
    //DELETE BRAND
    deleteBrand_page: function(req,res){
        var brand_productChuck=[];
        async.parallel({
            brand: function (callback) {
                Brand.findById(req.params.id).exec(callback)
            },
            brand_product: function (callback) {
                Product.find({ 'brand': req.params.id }).exec(callback)
            },
        }, function (err, results) {
            // Successful, so render.
            brand_productChuck.push(results.brand_product.slice(0,results.brand_product.length));
            console.log(brand_productChuck);
            res.render('Admin/brand_delete', { title: 'Delete brand',layout: 'layoutAdmin', Brand: results.brand, brand_product: brand_productChuck, length: results.brand_product.length});
        });
    },
    deleteBrandProduct: function(req,res){
        Product.findByIdAndRemove(req.params.id,function(err){
            if(err) throw err;
            else{
                res.redirect(`/adminHome/brandTable/delete/${req.params.brand}`);
            }
        })
    },
    deleteBrand: function(req,res){
        Brand.findByIdAndRemove(req.params.id, function(err){
            if(err) throw err;
            else
                res.redirect('/adminHome/brandTable');
        })
    },
    //CREATE BRAND
    createBrand_Get: function(req,res){
        res.render('Admin/createBrandForm', {title: 'create brand form', layout: 'layoutAdmin'});
    },
    createBrand_Post: function(req,res){
        var newBrand = new Brand({
            name: req.body.name,
        });
        newBrand.save(function(err){
            if(err) throw err;
            else
                res.redirect('/adminHome/brandTable')
        })
    },
    //*****************USER***********************/
    //LOAD USER INFO
    loadUserInfo: function(req,res){
        var userChuck = [];
        User.find({role: 0},function(err, result){
            if(err) throw err;
            userChuck.push(result.slice(0, result.length));
            res.render('Admin/userTable', {title: 'User Table', Users: userChuck, layout: 'layoutAdmin'});
        })
    },
    //DELETE USER INFOR
    deleteUserInfo: function(req, res){
        User.deleteMany({
            _id: req.params.id
        },
        function(err){
            if(err) throw err;
            redirect('/adminHome/userTable');
        })
    },
    //Load order page
    loadOrderPage: function(req, res, ){
        Order.find().populate('user').exec(function(err, orders){
            if(err) throw err;
            var cart;
            orders.forEach(function(order){
                cart = new Cart(order.cart);
                order.items = cart.generateArray();
            });
            res.render('Admin/orderTable', {title: 'Order table', Orders: orders, layout: 'layoutAdmin'})
        });
    }
}
module.exports = brandAdminController;