<<<<<<< refs/remotes/origin/master
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminSchema= new Schema({
    id: Number,
    username: String,
    password: String,
    name: String,
    gender: boolean
  });
=======
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminSchema= new Schema({
    id: Number,
    username: String,
    password: String,
    name: String,
    gender: boolean
  });
>>>>>>> distributed
  module.exports = mongoose.model('Admin', adminSchema);