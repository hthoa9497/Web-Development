var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
	id: {type: Number },
  name: {type: String, required: true, max: 100},
  date_of_birth: {type: Date},
  username: {type: String, required: true},
  pass: {type: String, required: true},
  email: {type: String},
  phone: {type: String, min: 10, max: 11},
  role: {type: Number},
  }
);
//Export model
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.pass, salt, function(err, hash) {
          newUser.pass = hash;
          newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
} 

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  })
}