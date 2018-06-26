var User = require("../models/user.js")
<<<<<<< HEAD
var bcrypt = require('bcrypt');
=======
>>>>>>> parent of b41642a... Update information user

var authenticationController = {
    userSignup: function(req, res){
        var name = req.body.name;
        var date_of_birth = new Date(req.body.date_of_birth);
        var username = req.body.username;
        var password = req.body.password;
        var repeatPassword = req.body.repeatPassword;
        var email = req.body.email;
        var phone = req.body.phone;

        //Validation
        req.checkBody('repeatPassword', 'Password do not match').equals(req.body.password);    
<<<<<<< HEAD
        User.findOne({username: req.body.username}, function(err,isExists){
            if(isExists!=null){
                console.log(isExists);
                req.flash('error_msg', 'Username đã tồn tại');
                res.redirect('/user/loginForm');
            }
            else{
                console.log(isExists);
                var errors = req.validationErrors();
                if(errors){
                    req.flash('error_msg', 'Mật khẩu không khớp');
                    res.redirect('/user/loginForm');
                }
                else{
                    var newUser = new User({
                        name: name,
                        date_of_birth: date_of_birth,
                        username: username,
                        pass: password,
                        email: email,
                        phone: phone,
                        role: 0
                    });
                    User.createUser(newUser, function(err, user){
                        if(err) throw err;
                    })
                    req.flash('success_msg', 'Đăng ký thành công, bây giờ bạn có thể đăng nhập');
                    res.redirect('/user/loginForm');
                }
            }
        })
    },
    userLoginPage: function(req,res){
        res.render('User/loginForm', {title:'Login page', layout: 'layoutUser'});
    },

    userEditInfo: function(req,res){
        var promise = new Promise(function(resolve, reject){
            User.findOne({username: req.body.username},'_id', function(err, ID){
                if(err) reject(Error(err));
                resolve(ID);
            })
        });
        promise.then(function(ID){
            console.log(ID);
            var updateUser = new User ({
                _id: ID["_id"],
                name: req.body.name,
                date_of_birth: req.body.date_of_birth,
                username: req.body.username,
                pass: req.body.password,
                email: req.body.email,
                phone: req.body.phone
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(updateUser.pass, salt, function(err, hash) {
                    updateUser.pass = hash;
                    console.log(updateUser.pass);
                    User.findByIdAndUpdate(ID["_id"], updateUser, function(err){
                        if(err) throw err;
                        req.flash('success_msg' , 'Cập nhật thành công');
                        res.redirect('/user/editInfo');
                    })
                });
            })
        })
        .catch(function(reject){   
            console.log(reject);
        })
=======
        
        var errors = req.validationErrors();
        if(errors){
            req.flash('error_msg', 'Mật khẩu không khớp');
            res.redirect('/user/loginForm');
        }
        else{
            var newUser = new User({
                name: name,
                date_of_birth: date_of_birth,
                username: username,
                pass: password,
                email: email,
                phone: phone
            });
            User.createUser(newUser, function(err, user){
                if(err) throw err;
            })
            req.flash('success_msg', 'Đăng ký thành công, bây giờ bạn có thể đăng nhập');
            res.redirect('/user/loginForm');
        }
    },
    userLoginPage: function(req,res){
        res.render('User/loginForm', {title:'Login page', layout: 'layoutUser'});
>>>>>>> parent of b41642a... Update information user
    }
}
module.exports = authenticationController;