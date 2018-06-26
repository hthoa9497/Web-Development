var express = require('express');
var router = express.Router();
var app = require('../app.js');
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');
var message = require('express-messages');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var AuthenticationController = require('../controller/AuthenticationController');
var User = require("../models/user.js")

/* GET users listing. */
router.get('/loginForm', AuthenticationController.userLoginPage);
//Register page
router.post('/signup-submit', AuthenticationController.userSignup );

passport.use(new localStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err,user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: " Unknown User"});
            }
            User.comparePassword(password, user.pass, function(err, isMatch ){
                if(err) throw err;
                if(isMatch){
                    
                    return done(null, user);
                }
                else{
                    return done(null,false, {message: "Invalid account"});
                }
            });
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/loginForm/login',
    passport.authenticate('local', {failureRedirect: '/user/loginForm', failureFlash: true }),
    function(req, res){
        if(req.user.role == 0)
            res.redirect('/');
        else
            res.redirect('/adminHome');
});
//Đăng xuất
router.get('/logout', AuthenticationController.userLogout);
//Thay đổi thông tin
router.get('/editInfo',AuthenticationController.userEditInfoPage);
router.post('/editInfo', AuthenticationController.userEditInfo);
//Thay đổi mật khẩu. 
router.get('/editPassword',AuthenticationController.userEditPasswordPage);
router.post('/editPassword/:id', AuthenticationController.userEditPassword);

module.exports = router;