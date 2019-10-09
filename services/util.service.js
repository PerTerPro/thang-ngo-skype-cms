"use strict"
const request = require('request');

/**
 *
 */
exports.sendMessage = function (conversationid, message) {
    var method = message.indexOf('\n') > -1 ? 'POST' : 'GET';

    var options = {
        method: method,
        url: 'https://thang-ngo-bot.herokuapp.com/sendMessage',
        json: true
    };

    switch (method.toUpperCase()) {
        case 'GET':
            options.qs = {
                conversationId: conversationid,
                message: message
            }
            break;
        case 'POST':
            options.body = {
                conversationId: conversationid,
                message: message
            }
            break;
        default:
            break;
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

exports.randomNumber = function(length){
    var str = '';
    for (let index = 0; index < length; index++) {
        str += (Math.floor(Math.random() * 9) + 0)
    }
    return str;
}



