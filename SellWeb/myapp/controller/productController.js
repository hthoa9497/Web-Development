<<<<<<< HEAD
<<<<<<< refs/remotes/origin/master
=======
>>>>>>> parent of b41642a... Update information user
var Product = require("../models/product.js");
var async = require('async');
var loadMenu = require('./loadMenu');

var Categories = {};
var categoryChuck = [];
var Brands = {};
var brandChuck = [];
loadMenu.loadBrandMenu(Brands, brandChuck);
loadMenu.loadCategoryMenu(Categories, categoryChuck);
var productController = {
    loadHomeProduct: function (req, res) {
        Product.find(function (err, docs) {
            var productChuck = [];
            var chuckSize = 3;
            for (var i = 0; i < 6; i += chuckSize) {
                productChuck.push(docs.slice(i, i + chuckSize));
            }
            res.render('User/index', { title: 'Shoes-shop', Products: productChuck, Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser' });
        });
    },
    loadAllProduct: function (req, res) {
        Product.find(function (err, docs) {
            var productChuck = [];
            var chuckSize = 3;
            for (var i = 0; i < docs.length; i += chuckSize) {
                productChuck.push(docs.slice(i, i + chuckSize));
            }
            res.render('User/products', { title: 'ProductSite', Products: productChuck, Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser'  })
        });
    },
    loadDetailProduct: function (req, res) {
        console.log(req.params.id);
        async.parallel({
            
            two: function (callback) {
                Product.find({ _id: req.params.id }).populate('brand').populate('categoryID').exec(function (err, aProduct) {
                    if (err) throw err;
                    else
                        console.log(aProduct)
                        callback(null, aProduct);
                })
            },
            one: function (callback) {
                Product.find({ brand: req.params.brand }, function (err, relativeProduct) {
                    if (err) throw err;
                    else
                        callback(null, relativeProduct);
                })
            },
        },
            function (err, result) {
                var productChuck = [];
                productChuck.push(result.one.slice(0, 3));
                res.render('User/productdetail', {
                    title: 'Product detail',
                    productdetail: result.two,
                    relativeproduct: productChuck,
                    Categories: categoryChuck, Brands: brandChuck,
                    layout: 'layoutUser' 
                });
            });
    },
    loadCategoryProduct: function (req, res) {
        var IDCategory = req.params.id;
        var Name = req.params.name;
        var productChuck = [];

        Product.find({ categoryID: IDCategory }).populate('categoryID').exec(function (err, Products) {
            if (err) throw err;
            else {
                productChuck.push(Products.slice(0, Products.length));
                res.render('User/Group-products', { title: 'Group-Products', GroupProducts: productChuck, name: Name, Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser' });
            }
        });
    },
    loadBrandProduct: function(req,res){
        var IDBrand = req.params.id;
        var Name = req.params.name;
        var productChuck = [];

        Product.find({ brand: IDBrand }).exec(function (err, Products) {
            if (err) throw err;
            else {
                //console.log(Products);
                productChuck.push(Products.slice(0, Products.length));
                res.render('User/Group-products', { title: 'Group-Products', GroupProducts: productChuck,name: Name, Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser' });
            }
        });
    }
}

<<<<<<< HEAD
=======
var Product = require("../models/product.js");
var async = require('async');
var loadMenu = require('./loadMenu');


var productController = {
    loadHomeProduct: function (req, res) {
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
            Product.find(function (err, docs) {
                var productChuck = [];
                var chuckSize = 3;
                for (var i = 0; i < 6; i += chuckSize) {
                    productChuck.push(docs.slice(i, i + chuckSize));
                }
                res.render('User/index', { title: 'Shoes-shop', Products: productChuck, Categories: result.two, Brands: result.one, layout: 'layoutUser'  })
            })
        }
        )
    },
    loadAllProduct: function (req, res) {
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
            Product.find(function (err, docs) {
                var productChuck = [];
                var chuckSize = 3;
                for (var i = 0; i < docs.length; i += chuckSize) {
                    productChuck.push(docs.slice(i, i + chuckSize));
                }
                res.render('User/products', { title: 'ProductSite', Products: productChuck, Categories: result.two, Brands: result.one, layout: 'layoutUser'  })
            })
        }
        )
    },
    loadDetailProduct: function (req, res) {
        var categoryChuck = [];
        var brandChuck = [];
        async.parallel({
            one: function (callback) {
                Product.find({ brand: req.params.brand }, function (err, relativeProduct) {
                    if (err) throw err;
                    else
                        callback(null, relativeProduct);
                })
            },
            two: function (callback) {
                Product.find({ _id: req.params.id }).populate('brand').populate('categoryID').exec(function (err, aProduct) {
                    if (err) throw err;
                    else
                        callback(null, aProduct);
                })
            },
            three: function(callback){
                loadMenu.loadBrandMenu().then(result => {
                    brandChuck.push(result.slice(0,result.length))
                    callback(null, brandChuck);
                });
            },
            four: function(callback){
                loadMenu.loadCategoryMenu().then(result => {
                    categoryChuck.push(result.slice(0,result.length))
                    callback(null,categoryChuck);
                });
            }
        },
        function (err, result) {
            if(err) throw err;
            var productChuck = [];
            productChuck.push(result.one.slice(0, 3));
            res.render('User/productdetail', {
                title: 'Product detail',
                productdetail: result.two,
                relativeproduct: productChuck,
                Categories: result.four,
                Brands: result.three,
                layout: 'layoutUser' 
            });
        });
    },
    loadCategoryProduct: function (req, res) {
        var IDCategory = req.params.id;
        var Name = req.params.name;
        var productChuck = [];
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
            Product.find({ categoryID: IDCategory }).populate('categoryID').exec(function (err, Products){
                if (err) throw err;
                else {
                    productChuck.push(Products.slice(0, Products.length));
                    res.render('User/Group-products', { title: 'Group-Products', GroupProducts: productChuck, name: Name, Categories: result.two, Brands: result.one, layout: 'layoutUser' });
                }
            });
        }
    )
    },
    loadBrandProduct: function(req,res){
        var IDBrand = req.params.id;
        var Name = req.params.name;
        var productChuck = [];
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
                Product.find({ brand: IDBrand }).exec(function (err, Products) {
                    if (err) throw err;
                    else {
                        //console.log(Products);
                        productChuck.push(Products.slice(0, Products.length));
                        res.render('User/Group-products', { title: 'Group-Products', GroupProducts: productChuck,name: Name, Categories: result.two, Brands: result.one, layout: 'layoutUser' });
                    }
                });
            }
        )
    }
}

>>>>>>> distributed
=======
>>>>>>> parent of b41642a... Update information user
module.exports = productController;