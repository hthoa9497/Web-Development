var seeder = require('mongoose-seed');
var faker = require('faker');
//admin
var admin=require('./models/admin.js');
//catalog
var catalog=require('./models/catalog.js');
//order
var order = require('./models/order.js');
//product
var product = require('./models/product.js');
//transaction
var transaction=require('./models/transaction.js');
//user
var user = require('./models/user.js');
var mongoose = require('mongoose');
mongoose.connect("mongodb://hthoa9497:t01655766369h@ds263759.mlab.com:63759/sellwebdb");
var Products = [
  //1
  new product({
    name: 'Ut eu feugiat',
    brand: 'Nike',
    price: 20,
    quantity: 3,
    availability: true,
    image_link: 'images/product/01.jpg',
    description: 'Fusce in dui et neque malesuada tincidunt nec at urna. Validate XHTML & CSS.',
  }),
  //2
  new product({
    name: 'Curabitur et turpis',
    brand: 'Convert',
    price: 80,
    quantity: 4,
    availability: true,
    image_link: 'images/product/02.jpg',
    description: 'Etiam et sapien ut nunc blandit euismod. Sed dui libero, semper a volutpat sed, placerat eu lectus.',
  }),
  //3
  new product({
    name: 'Mauris consectetur',
    brand: 'Nike',
    price: 70,
    quantity: 3,
    availability: true,
    image_link: 'images/product/03.jpg',
    description: 'Curabitur pellentesque ullamcorper massa ac ultricies. Maecenas porttitor erat quis leo pellentesque.',
  }),
  //4
  new product({
    name: 'Proin volutpat',
    brand: 'Nike',
    price: 100,
    quantity: 5,
    availability: true,
    image_link: 'images/product/04.jpg',
    description: 'Morbi non risus vitae est vestibulum tincidunt ac eget metus. Sed congue, erat id congue vehicula.',
  }),
  //5
  new product({
    name: 'Aenean tempus',
    brand: 'Nike',
    price: 90,
    quantity: 3,
    availability: true,
    image_link: 'images/product/05.jpg',
    description: 'Aenean eu elit arcu. Quisque eget blandit erat. Integer molestie malesuada augue vitae mollis.',
  }),
  //6
  new product({
    name: 'Nulla luctus urna',
    brand: 'ADIDAS',
    price: 90,
    quantity: 3,
    availability: true,
    image_link: 'images/product/06.jpg',
    description: 'Nunc nisl nisi, aliquet eu gravida vitae, porta vel ante. Pellentesque faucibus risus et sem volutpat.',
  }),
  //7
  new product({
    name: 'Pellentesque egestas',
    brand: 'CONVERT',
    price: 110,
    quantity: 3,
    availability: true,
    image_link: 'images/product/07.jpg',
    description: 'Aenean eu elit arcu. Quisque eget blandit erat. Integer molestie malesuada augue vitae mollis.',
  }),
  //8
  new product({
    name: 'Suspendisse porttitor',
    brand: 'ADIDAS',
    price: 220,
    quantity: 3,
    availability: true,
    image_link: 'images/product/08.jpg',
    description: 'Nulla rutrum neque vitae erat condimentum eget malesuada neque molestie. Nunc a leo tellus.',
  }),
  //9
  new product({
    name: 'Nam vehicula',
    brand: 'ADIDAS',
    price: 210,
    quantity: 1,
    availability: true,
    image_link: 'images/product/09.jpg',
    description: 'Vivamus accumsan luctus interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  }),
]

var done = 0;
for(var i=0; i<Products.length; i++){
    Products[i].save(function(err,result){
        if(err)throw err;
        else{
            done++;
            if(done===Products.length){
                exit();
            }
            console.log("created...");
        }
    })
}
function exit(){
    mongoose.disconnect();
}