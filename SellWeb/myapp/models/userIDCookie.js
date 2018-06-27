var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userIDCookieSchema= new Schema({
    userID:  {type: String},
    cookie:  {type: String},
});
module.exports = mongoose.model('userIDCookie', userIDCookieSchema);