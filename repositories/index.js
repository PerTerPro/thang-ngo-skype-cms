"user strict";

const botRepo = require('./bot-repo');
const conversationRepo = require('./conversation-repo');
const otpRepo = require('./otp.repo');

module.exports = {
    BotRepo: botRepo,
    ConversationRepo: conversationRepo,
    OtpRepo: otpRepo
}