var User = require("./models/user.js");

function ValidPass(){
    console.log("da vao");
    var oldPass
    document.getElementById('oldPassword').innerHTML="if";
    oldPass = document.getElementsByName('oldPassword');
    User.comparePassword(oldPass, user.pass, function(err, isMatch ){
        if(err) throw err;
            if(!isMatch){
                document.getElementById('oldPassword').innerHTML="if";
            }
            else
                document.getElementById('oldPassword').innerHTML="else";
    })
}