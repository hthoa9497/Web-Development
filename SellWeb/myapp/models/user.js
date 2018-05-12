var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
	id: {type: Number },
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
	email: {type: String},
	pass: {type: String},
	address: {type: String},
	// thời gian tạo tài khoản
	created_time: {type: Date},
  }
);

// Virtual for user's full name
UserSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});


//Export model
module.exports = mongoose.model('User', UserSchema);