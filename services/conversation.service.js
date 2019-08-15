"use strict"

const conversationRepo = require('../repositories').ConversationRepo;

exports.findConversationWithId = function(conversationId){
    return conversationRepo.findConversationWithId(conversationId);
}

