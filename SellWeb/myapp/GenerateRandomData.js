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

module.exports={

    productData: function(){
        var data;
            data = product({
                name: 'Ut eu feugiat',
                brand: 'Nike',
                price: 20,
                quantity: 3,
                availability: true,
                image_link: 'images/product/01.jpg',
                description: 'Fusce in dui et neque malesuada tincidunt nec at urna. Validate XHTML & CSS.',
              })
              data.save(function(err){
                if(err) throw err;
                console.log("Created...")
            })
            //1
            data = product({
              name: 'Curabitur et turpis',
              brand: 'Convert',
              price: 80,
              quantity: 4,
              availability: true,
              image_link: 'images/product/02.jpg',
              description: 'Etiam et sapien ut nunc blandit euismod. Sed dui libero, semper a volutpat sed, placerat eu lectus.',
            })
            data.save(function(err){
              if(err) throw err;
              console.log("Created...")
          })
          //2
          data = product({
            name: 'Mauris consectetur',
            brand: 'Nike',
            price: 70,
            quantity: 3,
            availability: true,
            image_link: 'images/product/03.jpg',
            description: 'Curabitur pellentesque ullamcorper massa ac ultricies. Maecenas porttitor erat quis leo pellentesque.',
          })
          data.save(function(err){
            if(err) throw err;
            console.log("Created...")
        })
        //3
        data = product({
          name: 'Proin volutpat',
          brand: 'Nike',
          price: 100,
          quantity: 5,
          availability: true,
          image_link: 'images/product/04.jpg',
          description: 'Morbi non risus vitae est vestibulum tincidunt ac eget metus. Sed congue, erat id congue vehicula.',
        })
        data.save(function(err){
          if(err) throw err;
          console.log("Created...")
      })
      //4
      data = product({
        name: 'Aenean tempus',
        brand: 'Nike',
        price: 90,
        quantity: 3,
        availability: true,
        image_link: 'images/product/05.jpg',
        description: 'Aenean eu elit arcu. Quisque eget blandit erat. Integer molestie malesuada augue vitae mollis.',
      })
      data.save(function(err){
        if(err) throw err;
        console.log("Created...")
    });
    //5
    data = product({
      name: 'Nulla luctus urna',
      brand: 'ADIDAS',
      price: 90,
      quantity: 3,
      availability: true,
      image_link: 'images/product/06.jpg',
      description: 'Nunc nisl nisi, aliquet eu gravida vitae, porta vel ante. Pellentesque faucibus risus et sem volutpat.',
    })
    data.save(function(err){
      if(err) throw err;
      console.log("Created...")
  });
  //6
  data = product({
    name: 'Pellentesque egestas',
    brand: 'CONVERT',
    price: 110,
    quantity: 3,
    availability: true,
    image_link: 'images/product/07.jpg',
    description: 'Aenean eu elit arcu. Quisque eget blandit erat. Integer molestie malesuada augue vitae mollis.',
  })
  data.save(function(err){
    if(err) throw err;
    console.log("Created...")
});
//7
data = product({
  name: 'Suspendisse porttitor',
  brand: 'ADIDAS',
  price: 220,
  quantity: 3,
  availability: true,
  image_link: 'images/product/08.jpg',
  description: 'Nulla rutrum neque vitae erat condimentum eget malesuada neque molestie. Nunc a leo tellus.',
})
data.save(function(err){
  if(err) throw err;
  console.log("Created...")
});
//8
data = product({
  name: 'Nam vehicula',
  brand: 'ADIDAS',
  price: 210,
  quantity: 1,
  availability: true,
  image_link: 'images/product/09.jpg',
  description: 'Vivamus accumsan luctus interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
})
data.save(function(err){
  if(err) throw err;
  console.log("Created...")
});
    },
}