
var Category = require("../models/category.js");
var Brand = require('../models/brand.js');

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
    }
}

module.exports = loadMenu;

