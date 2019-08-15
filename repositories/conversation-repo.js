var mongoose  = require('mongoose');

const url = process.env.ConnectionString;
const collection = 'conversation';

// mongoose.connect(url, { useNewUrlParser: true });
//  const client = new mongoose.connect(url, { useNewUrlParser: true });

//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;

//Lấy kết nối mặc định
var db = mongoose.connection;

var conversationModel = require('../models/conversationModel');
var schema = conversationModel.conversationModel();
var Conversation = mongoose.model(collection, schema);



//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', function () {
    console.error('MongoDB connection error:');
});

// const url = process.env.ConnectionString;
// mongoose.connect(url, { useNewUrlParser: true });
// const client = new mongoose.connect(url, { useNewUrlParser: true });
// var client = mongoose.connection;

exports.findConversationWithConversationId = function (conversationId) {
    var query = {
        conversationId: conversationId
    }
    return Conversation.findOne(query);
    

    // return new Promise(function (resolve, reject) {
    //     client.connect(err => {
    //         var db = client.db(process.env.Database);
    //         const collection = db.collection(collectionName);

    //         var query = {
    //             "conversationId": conversationId
    //         }
    //         collection.findOne(query, function (err, res) {
    //             if (err) reject(err);
    //             else {
    //                 console.log(res);
    //                 resolve(res);
    //             }
    //             // client.close();
    //         });
    //     });
    // });
}

