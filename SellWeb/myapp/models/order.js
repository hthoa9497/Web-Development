var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
		user: {type: Schema.Types.ObjectId, ref: 'User'},
		cart:{type: Object, required: true},
		name: {type: String, required: true},
		address: {type: String, required: true},
		phone: {type: String, required: true},
  }
);


//Export model
module.exports = mongoose.model('Order', OrderSchema);
