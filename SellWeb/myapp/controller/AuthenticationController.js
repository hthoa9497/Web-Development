var User = require("../models/user.js")

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
    }
}
module.exports = authenticationController;