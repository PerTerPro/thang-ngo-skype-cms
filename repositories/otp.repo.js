const url = process.env.ConnectionString;
const collection = 'otps';

var mongoose = require('mongoose');
var otpModel = require('../models/otpModel');
var schema = otpModel.otpModel();
var Otp = mongoose.model(collection, schema);

//mongoose.connect(url, { useNewUrlParser: true });
//  const client = new mongoose.connect(url, { useNewUrlParser: true });

//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;

//Lấy kết nối mặc định
var db = mongoose.connection;

//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', function () {
    console.error('MongoDB connection error:');
});

exports.getById = function(id){
    var query = {
        id: id
    }
    return Otp.findOne(query);
}

exports.getByManyCondition = function(query){
    return Otp.findOne(query);    
}

exports.update = function(otp){
    delete otp._id;
    return Otp.updateOne(otp).where('id').equals(otp.id);
}

exports.add = function(otp){
    return Otp.create(otp);
}

exports.remove = function(id){
    return Otp.deleteOne({id: id});
}

exports.removeManyByQuery = function(query){
    return Otp.deleteMany(query);
}