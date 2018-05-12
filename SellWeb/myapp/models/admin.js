var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminSchema= new Schema({
    id: Number,
    username: String,
    password: String,
    name: String
  });
  module.exports = mongoose.model('Admin', adminSchema);