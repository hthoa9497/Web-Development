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
module.exports = menuTags;