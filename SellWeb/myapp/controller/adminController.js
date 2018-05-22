var Product = require("../models/product");

var adminController = {
    loadProductTable: function(req,res){
        var productChuck = [];
        Product.find().populate('categoryID').populate('brand').exec(function(err,products){
            if(err) throw err;
            else{
                productChuck.push(products.slice(0,products.length));   
                res.render('Admin/dataTable', {title: "Admin", layout: 'layoutAdmin', Products: productChuck});
            }
        })
    }
}

module.exports = adminController;