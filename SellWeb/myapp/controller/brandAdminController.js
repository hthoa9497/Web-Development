var Brand = require('../models/brand');
var async = require('async');
var Product = require("../models/product.js");
var loadMenu = require('./loadMenu')
const {check, validationResult} = require('express-validator/check');
var brandAdminController = {
    loadBrandTable: function(req,res){
        var brandChuck = [];
        Brand.find(function(err,docs){
            if(err) throw err;
            else{
                brandChuck.push(docs.slice(0,docs.length));
                console.log(brandChuck);
                console.log("thanh cong")
            }
            res.render('Admin/brandTable', {title: "Brand Admin table", layout: 'layoutAdmin', Brands: brandChuck});
        });
    },
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
                console.log("tc");
                res.redirect(`/adminHome/brandTable/${req.params.brand}/delete`);
            }
        })
    },
    deleteBrand: function(req,res){
        console.log('thanh cong');
        Brand.findByIdAndRemove(req.params.id, function(err){
            if(err) throw err;
            else
                
                res.redirect('/adminHome/brandTable');
        })
    },
    //CREATE PRODUCT
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
}
module.exports = brandAdminController;