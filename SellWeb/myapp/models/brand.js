var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var brandSchema= new Schema({
    name: String,
  });
  module.exports = mongoose.model('brand', brandSchema);