var brand=require('../models/brand.js');
var mongoose = require('mongoose');
mongoose.connect("mongodb://hthoa9497:t01655766369h@ds263759.mlab.com:63759/sellwebdb");
var Brands =[
    new brand({
        _id: 'Nike',
        name: 'Nike',
    }),
    new brand({
        _id: 'Adidas',
        name: 'Adidas',
    }), 
    new brand({
        _id: 'Bitis',
        name: 'Bitis',
    }),
];
var done = 0;
for(var i=0; i<Brands.length; i++){
    Brands[i].save(function(err,result){
        if(err)throw err;
        else{
            done++;
            if(done===Brands.length){
                exit();
            }
            console.log("created...");
        }
    })
}
function exit(){
    mongoose.disconnect();
}