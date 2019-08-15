const url = process.env.ConnectionString;
const collection = 'bot-works';

var mongoose = require('mongoose');
var botWorkModel = require('../models/botworkModel');
var schema = botWorkModel.botWorkModel();
var BotWork = mongoose.model(collection, schema);

mongoose.connect(url, { useNewUrlParser: true });
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
    return BotWork.findOne(query);
}

exports.getAllWorkOfConversation = function (conversationId, isEnabled) {
    // var schema = botWorkModel.botWorkModel();
    // var BotWork = mongoose.model(collection, schema);
    // BotWork.create({ _id: '5d1484c41c9d44000021d1b6', name: 'also_awesome' }, function (err, awesome_instance) {
    //     if (err) return handleError(err);
    //     // lưu!
    //   });
    var query = {
        conversationId: conversationId
    }
    if (isEnabled != undefined) query.isEnabled = isEnabled;
    return BotWork.find(query);
}

exports.updateBotWork = function(botWork){
    delete botWork._id;
    return BotWork.updateOne(botWork).where('id').equals(botWork.id);
}

exports.addBotWork = function(botWork){
    return BotWork.create(botWork);
}

exports.removeBotWork = function(id){
    return BotWork.remove({id: id})
}