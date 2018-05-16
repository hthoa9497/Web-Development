var loadMenu = require('./loadMenu');

var Categories = {};
var categoryChuck = [];
loadMenu.loadCategoryMenu(Categories, categoryChuck);

var menuTags = {
    aboutTag: function(req,res){
        res.render('about', {title: 'about us', Categories: categoryChuck});        
    },
    FAQsTag: function(req,res){
        res.render('faqs', {title: "FAQs", Categories: categoryChuck});
    },
    checkoutTag: function(req,res){
        res.render('checkout', {title: "Checkout", Categories: categoryChuck});
    },
    contactusTag: function(req,res){
        res.render('contact', {title: "Contactus", Categories: categoryChuck});
    }
}
module.exports = menuTags;