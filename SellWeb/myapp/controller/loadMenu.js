<<<<<<< HEAD

=======
>>>>>>> parent of b41642a... Update information user
var Category = require("../models/category.js");
var Brand = require('../models/brand.js');

var loadMenu = {
<<<<<<< HEAD
    loadCategoryMenu: function() {
        return new Promise((resolve, reject) => {
            Category.find(function(err, docs) {
                if (err) reject(err);
                resolve(docs);
            });
        });
    },
    loadBrandMenu: function() {
        return new Promise((resolve, reject) => {
            Brand.find(function(err, docs) {
                if (err) reject(err);
                resolve(docs);
            });
        });
    }
}

=======
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
>>>>>>> parent of b41642a... Update information user
module.exports = loadMenu;

