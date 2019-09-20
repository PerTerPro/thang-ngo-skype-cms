"use strict"
const request = require('request');

exports.sendMessage = function (conversationid, message) {
    var options = {
        method: 'GET',
        url: 'https://thang-ngo-bot.herokuapp.com/sendMessage',
        qs:
        {
            conversationId: conversationid,
            message: message
        },
        headers:
        {
            // 'cache-control': 'no-cache',
            // Connection: 'keep-alive',
            // 'Accept-Encoding': 'gzip, deflate',
            // Host: 'thang-ngo-bot.herokuapp.com',
            // 'Postman-Token': 'd68926ee-1cb4-4ed5-8794-b3f664d5fb56,11f35f7c-03b1-4358-b9db-897806145188',
            // 'Cache-Control': 'no-cache',
            // Accept: '*/*',
            // 'User-Agent': 'PostmanRuntime/7.15.2',
            // 'Content-Type': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}
