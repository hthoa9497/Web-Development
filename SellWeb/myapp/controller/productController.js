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

        Product.find({ brand: IDBrand }).populate('brand').exec(function (err, Products) {
            if (err) throw err;
            else {
                //console.log(Products);
                productChuck.push(Products.slice(0, Products.length));
                res.render('User/Group-products', { title: 'Group-Products', GroupProducts: productChuck,name: Name, Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser' });
            }
        });
    }
}

module.exports = productController;