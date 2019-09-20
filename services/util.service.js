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
        default:
            break;
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}



