var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
	// Tên sản phẩm
	name: {type: String},
	// Thương hiệu
	brand: {type: Schema.Types.ObjectId, ref: "brand" },
	// giá sản phẩm
	price: {type: Number},
	//số lượng
	quantity:{type: Number},
	//tình trạng
	availability: {type: Boolean},
	//link hình
	image_link: {type: String},
	//mô tả
	description:{type: String},
	//bán chạy
	sells: {type: Number},
	//tham chieu den category
	categoryID: {type: Schema.Types.ObjectId, ref: "category"},
  }
);
ProductSchema.indexes({name: 'text', description: 'text'})

//Export model
module.exports = mongoose.model('Product', ProductSchema);