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
    //DELETE PRODUCT
    deleteProduct: function(req,res){
        console.log("ok thanh cong");
        Product.findByIdAndRemove(req.params.id, function(err){
            if(err) throw err;
            else
                res.redirect('/adminHome/dataTable/productData');
        })
    },
    //EDIT PRODUCT
    editProduct_Get: function(req,res){
        Product.findById(req.params.id, function(err, docs){
            if(err) throw err;
            else
                res.render('Admin/productForm', {title: "product form", layout: 'layoutAdmin', Product: docs, Categories: categoryChuck, Brands: brandChuck});
        })
    },
    editProduct_Post: function(req,res){
        var newProduct = new Product({
            _id: req.params.id,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            quantity: req.body.quantity,
            description: req.body.description,
            categoryID: req.body.categoryID,
        });
        console.log(newProduct);
        Product.findByIdAndUpdate(req.params.id,newProduct, function(err){
            if(err) throw err;
            else
             res.redirect('/adminHome/dataTable/productData');
        })
    }
}
module.exports = productAdminController;