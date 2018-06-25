<<<<<<< refs/remotes/origin/master
var loadMenu = require('./loadMenu');

var Categories = {};
var categoryChuck = [];
var Brands = {};
var brandChuck = [];
loadMenu.loadBrandMenu(Brands, brandChuck);
loadMenu.loadCategoryMenu(Categories, categoryChuck);

var menuTags = {
    aboutTag: function(req,res){
        res.render('User/about', {title: 'about us', Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser'});        
    },
    FAQsTag: function(req,res){
        res.render('User/faqs', {title: "FAQs", Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser'});
    },
    checkoutTag: function(req,res){
        res.render('User/checkout', {title: "Checkout", Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser'});
    },
    contactusTag: function(req,res){
        res.render('User/contact', {title: "Contactus", Categories: categoryChuck, Brands: brandChuck, layout: 'layoutUser'});
    }
}
=======
var loadMenu = require('./loadMenu');
var async = require('async');

var menuTags = {
    aboutTag: function(req,res){
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
            function(err, result){
                res.render('User/about', {title: 'about us', Categories: result.two, Brands: result.one, layout: 'layoutUser'})
            }
        )
    },
    FAQsTag: function(req,res){
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
            function(err, result){
                res.render('User/faqs', {title: "FAQs", Categories: result.two, Brands: result.one, layout: 'layoutUser'})
            }
        )
    },
    checkoutTag: function(req,res){
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
            function(err, result){
                res.render('User/checkout', {title: "Checkout", Categories: result.two, Brands: result.one, layout: 'layoutUser'})
            }
        )
    },
    contactusTag: function(req,res){
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
            function(err, result){
                res.render('User/contact', {title: "Contactus", Categories: result.two, Brands: result.one, layout: 'layoutUser'})
            }
        )
    }
}
>>>>>>> distributed
module.exports = menuTags;