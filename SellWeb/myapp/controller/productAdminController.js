var Product = require('../models/product');
var loadMenu = require('./loadMenu')
var Categories = {};
var categoryChuck = [];
const {check, validationResult} = require('express-validator/check');

var Brands = {};
var brandChuck = [];
loadMenu.loadBrandMenu(Brands, brandChuck);
loadMenu.loadCategoryMenu(Categories, categoryChuck);

var productAdminController = {
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
        Product.findById(req.params.id, function(err, docs){
            if(err) throw err;
            else
                res.render('Admin/editProductForm', {title: "edit product form", layout: 'layoutAdmin', Product: docs, Categories: categoryChuck, Brands: brandChuck});
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
        res.render('Admin/createProductForm', {title: 'create product form', layout: 'layoutAdmin', Categories: categoryChuck, Brands: brandChuck})
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
}
module.exports = productAdminController;