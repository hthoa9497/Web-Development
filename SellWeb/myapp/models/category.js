var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new Schema({
  _id: String,
  name: String,
});
module.exports = mongoose.model("catalog", categorySchema);