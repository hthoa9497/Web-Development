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
module.exports = menuTags;