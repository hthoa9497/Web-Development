var Product = require('../models/product');


var productAdminController = {
    deleteProduct: function(req,res){
        console.log("ok thanh cong");
        Product.findByIdAndRemove(req.params.id, function(err){
            if(err) throw err;
            else
                res.redirect('/adminHome/dataTable/productData');
        })
    }
}
module.exports = productAdminController;