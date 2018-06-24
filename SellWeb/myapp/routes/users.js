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
router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/')
})

router.get('/editInfo', function(req, res){
    res.render('User/editInfo', {title: "Edit information", layout: 'layoutUser'});
})
router.post('/editInfo', AuthenticationController.userEditInfo);
module.exports = router;