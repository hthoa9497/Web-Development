var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
    id:{type: Number},
	// id giao dịch, 1 giao dịch có nhiều đơn hàng và 1 đơn hàng phải nằm trong 1 giao dịch
	transaction_id: {type: Number},
	//id sản phẩm
	product_id: {type: Number},
	// Số lượng sản phẩm trên 1 đơn hàng
	qty: {type: Number},
	// Trạng thái đơn hàng đã được gửi chưa
	status: {type: Boolean}
  }
);


//Export model
module.exports = mongoose.model('Order', OrderSchema);
