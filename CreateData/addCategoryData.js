var category=require('../models/category.js');
var mongoose = require('mongoose');
mongoose.connect("mongodb://hthoa9497:t01655766369h@ds263759.mlab.com:63759/sellwebdb");
var Categories =[
    new category({
        _id: 'nam',
        name: 'Nam',
    }),
    new category({
        _id: 'nu',
        name: 'Nữ',
    }),
];
var done = 0;
for(var i=0; i<Categories.length; i++){
    Categories[i].save(function(err,result){
        if(err)throw err;
        else{
            done++;
            if(done===Categories.length){
                exit();
            }
            console.log("created...");
        }
    })
}
function exit(){
    mongoose.disconnect();
}