"use strict"

const conversationRepo = require('../repositories').ConversationRepo;

exports.findConversationWithConversationId = function(conversationId){
    return conversationRepo.findConversationWithConversationId(conversationId);
}

