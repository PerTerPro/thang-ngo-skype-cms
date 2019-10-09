//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var OtpModel = new Schema({
  // _id: Schema.Types.ObjectId,
  id: String,
  conversationId: String,
  otp: String
});

exports.otpModel = function () {
  return OtpModel;
}