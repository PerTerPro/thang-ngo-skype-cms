var mongoose  = require('mongoose');

const url = process.env.ConnectionString;
const collection = 'conversation';

var mongoose = require('mongoose');
var botWorkModel = require('../models/botworkModel');
var schema = botWorkModel.botWorkModel();
var BotWork = mongoose.model(collection, schema);

// const url = process.env.ConnectionString;
// mongoose.connect(url, { useNewUrlParser: true });
// const client = new mongoose.connect(url, { useNewUrlParser: true });
// var client = mongoose.connection;

exports.findConversationWithId = function (conversationId) {

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

