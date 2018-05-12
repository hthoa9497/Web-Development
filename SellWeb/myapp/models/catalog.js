var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var catalogSchema = new Schema({
  id: Number,
  name: String,
  parent_id: Number
});
module.exports = mongoose.model("catalog", catalogSchema);