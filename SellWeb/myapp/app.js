var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
<<<<<<< HEAD
var productsRouter= require('./routes/products');
var adminsRouter= require('./routes/admins');
=======
>>>>>>> parent of b41642a... Update information user
var mongoose = require('mongoose');
var expressHbs = require('express-handlebars')  
var app = express();

var localStrategy = require('passport-local').Strategy;
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');


//Connect database.
mongoose.connect("mongodb://hthoa:t01655766369h@ds161901.mlab.com:61901/sellweb");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',expressHbs({defaultLayout:false,extname:'.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Express session.
app.use(session({
  secret: 'HHSecretKey',
  resave: true,
  saveUninitialized: true,
}))

//Passport init:
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//connect-flash
app.use(flash());
//Global vars
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})
//serializeUser deserializeUser
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
<<<<<<< HEAD
app.use('/product',productsRouter);
app.use('/adminHome', adminsRouter);
=======
>>>>>>> parent of b41642a... Update information user

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
