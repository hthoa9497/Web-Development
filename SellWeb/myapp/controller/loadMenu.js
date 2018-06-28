


var Category = require("../models/category.js");
var Brand = require('../models/brand.js');
var Product = require('../models/product')

var loadMenu = {
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
    },
    loadTopTen: function(){
        return new Promise((resolve,reject)=>{
            Product.find().sort({sells: -1}).limit(10).exec(function(err, docs){
                if(err) throw err;
                resolve(docs);
            })
        })
    }
}

module.exports = loadMenu;

