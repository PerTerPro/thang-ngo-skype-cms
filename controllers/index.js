const coreCtrl = require('./core.server.controller');
const authenCtrl = require('./authen.controller');
const conversationCtrl = require('./conversation.controller');

module.exports = {
    Core: coreCtrl,
    Authentication: authenCtrl,
    Conversation: conversationCtrl
};