const conversationService = require('./conversation.service');
const botworkService = require('./botwork.service');
const utilService = require('./util.service');

module.exports = {
    ConversationService: conversationService,
    BotWorkService: botworkService,
    UtilService: utilService
};