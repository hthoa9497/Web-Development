var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var transactionSchema = new Schema({
  status: Boolean,
  user_id: Number,
  user_email: String,
  user_phone: Number,
  amount: Number,
  payment: String,
  payment_info: String,
  message: String
  //Thoi diem giao dich: created:
});
module.exports = mongoose.model('transaction', transactionSchema);