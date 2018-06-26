<<<<<<< HEAD
<<<<<<< refs/remotes/origin/master
=======
>>>>>>> parent of b41642a... Update information user
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminSchema= new Schema({
    id: Number,
    username: String,
    password: String,
    name: String,
    gender: boolean
  });
<<<<<<< HEAD
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
=======
>>>>>>> parent of b41642a... Update information user
  module.exports = mongoose.model('Admin', adminSchema);