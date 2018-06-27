
var User = require("../models/user.js")
var loadMenu = require('./loadMenu');
var bcrypt = require('bcrypt');
var async = require('async');

var authenticationController = {
    //SIGN UP AND SIGN IN
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
        var categoryChuck = [];
        var brandChuck = [];
        async.parallel({
            one: function(callback){
                loadMenu.loadBrandMenu().then(result => {
                    brandChuck.push(result.slice(0,result.length))
                    callback(null, brandChuck);
                });
            },
            two: function(callback){
                loadMenu.loadCategoryMenu().then(result => {
                    categoryChuck.push(result.slice(0,result.length))
                    callback(null,categoryChuck);
                });
            }
        },
            function(err, result){
                res.render('User/loginForm', {title:'Login page', Categories: result.two, Brands: result.one, layout: 'layoutUser'});
            }
        )
    },

    //EDIT USER INFO
    userEditInfoPage: function(req,res){
        var categoryChuck = [];
        var brandChuck = [];
        async.parallel({
            one: function(callback){
                loadMenu.loadBrandMenu().then(result => {
                    brandChuck.push(result.slice(0,result.length))
                    callback(null, brandChuck);
                });
            },
            two: function(callback){
                loadMenu.loadCategoryMenu().then(result => {
                    categoryChuck.push(result.slice(0,result.length))
                    callback(null,categoryChuck);
                });
            }
        },
            function(err, result){
                res.render('User/editInfo', {title:'Edit information', Categories: result.two, Brands: result.one, layout: 'layoutUser'});
            }
        )
    },

    userEditInfo: function(req,res){
        var promise = new Promise(function(resolve, reject){
            User.findOne({username: req.body.username},'_id', function(err, ID){
                if(err) reject(Error(err));
                resolve(ID);
            })
        });
        promise.then(function(ID){
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
    },

    //LOGOUT
    userLogout: function(req,res){
        req.logout();
        res.redirect('/')
    },
    //EDIT PASSWORD
    userEditPasswordPage: function(req, res){
        var categoryChuck = [];
        var brandChuck = [];
        async.parallel({
            one: function(callback){
                loadMenu.loadBrandMenu().then(result => {
                    brandChuck.push(result.slice(0,result.length))
                    callback(null, brandChuck);
                });
            },
            two: function(callback){
                loadMenu.loadCategoryMenu().then(result => {
                    categoryChuck.push(result.slice(0,result.length))
                    callback(null,categoryChuck);
                });
            }
        },
            function(err, result){
                res.render('User/editInfo', {title:'Edit information', Categories: result.two, Brands: result.one, layout: 'layoutUser', isEditPass: '1'});
            }
        )
    },

    userEditPassword: function(req, res){
        var promise = new Promise(function(resolve, reject){
            User.findOne({_id: req.params.id}, function(err, user){
                if(err) reject(Error(err));
                resolve(user);
            })
        })
        promise.then(function(user){
            User.comparePassword(req.body.oldPassword, user.pass, function(err, isMatch ){
                if(err) throw err;
                if(isMatch){
                    if(req.body.newPassword == req.body.repeatPassword){
                        var newPass = req.body.newPassword;
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(newPass, salt, function(err, hash) {
                                newPass = hash;
                                User.findOneAndUpdate({"_id": req.params.id},{$set: {"pass": newPass}}, function(err){
                                    if(err) throw err;
                                    req.flash('success_msg' , 'Cập nhật thành công');
                                    res.redirect('/user/editPassword');
                                })
                            });
                        })
                    }
                }
                else{
                    req.flash('error_msg' , 'Mật khẩu củ sai');
                    res.redirect('/user/editPassword')
                }
            });
        })
        .catch(function(reject){   
            console.log(reject);
        })
    },
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.session.oldUrl = req.url;
        res.redirect('/user/loginForm');
    }
}
module.exports = authenticationController;