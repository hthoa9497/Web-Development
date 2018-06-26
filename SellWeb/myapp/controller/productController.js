var Product = require("../models/product.js");
var async = require('async');
var loadMenu = require('./loadMenu');
var Cart = require("../models/cart.js");
var Order = require("../models/order.js");


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
                        productChuck.push(Products.slice(0, Products.length));
                        res.render('User/Group-products', { title: 'Group-Products', GroupProducts: productChuck,name: Name, Categories: result.two, Brands: result.one, layout: 'layoutUser' });
                    }
                });
            }
        )
    },
    //search product
    searchProduct: function(req, res){
        var productChuck = [];
        Product.find({$text: {$search: req.body.keyword}}).exec(function(err,docs){
            if(err) throw err;
            productChuck.push(docs.slice(0, docs.length));
            console.log(docs);
            res.render('User/Group-products', { title: 'Group-Products', GroupProducts: productChuck,name: req.body.keyword, layout: 'layoutUser'});
        })
    },
    //Add to cart
    addProductToCart: function(req,res){
        var productID = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart: {});
        Product.findById(productID, function(err, product){
            if(err){
                res.redirect('/');
            }
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(cart);
            res.redirect('/');
        });
    },
    //Shopping cart
    shoppingCartPage: function(req, res){
        if(!req.session.cart){
            return res.render('User/shoppingcart', {products: null, layout: 'layoutUser'});
        }
        var cart = new Cart(req.session.cart);
        res.render('User/shoppingcart', {products: cart.generateArray(), totalPrice: cart.totalPrice, layout: 'layoutUser'});
    },
    //checkout
    checkoutPage: function(req, res){
        if(!req.session.cart){
            res.redirect('/product/shoppingCart');
        }
        var cart = new Cart(req.session.cart);
        res.render('User/checkout', {totalQty: cart.totalQty,totalPrice: cart.totalPrice, products: cart.generateArray(), layout: 'layoutUser'}  )
    },
    //Order
    orderProduct: function(req, res){
        if(!req.session.cart){
            res.redirect('/product/shoppingCart');
        }
        var order = new Order ({
            user: req.user,
            cart: req.session.cart,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        })
        order.save(function(err){
            if(err) throw err;
            req.flash('success_msg', 'Bạn đã đặt hàng thành công');
            req.session.cart = null;
            res.redirect('/');
        })
    }
}

module.exports = productController;