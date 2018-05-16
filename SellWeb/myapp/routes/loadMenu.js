var Category = require("../models/category.js");
var Brand = require('../models/brand.js');

var loadMenu = {
    loadCategoryMenu: function(Categories, categoryChuck){
        Category.find(function(err,docs){
            if(err) throw err;
            else{
                Categories=docs;
                categoryChuck.push(Categories.slice(0,Categories.length));
            }
        });
    },
    loadBrandMenu: function(Brands, brandChuck){
        Brand.find(function(err,docs){
            if(err) throw err;
            else{
                Brands=docs;
                brandChuck.push(Brands.slice(0,Brands.length));
            }
        });
    }
}
module.exports = loadMenu;

