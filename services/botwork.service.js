"use strict"

const botRepo = require('../repositories').BotRepo;
const moment = require('moment');

exports.getAllWorkOfConversation = function(conversationId, isEnabled){   
     return  botRepo.getAllWorkOfConversation(conversationId, isEnabled);
    // return botRepo.insertWork();
}

exports.getById = function(botWorkId){    
    return botRepo.getById(botWorkId);
}

exports.upsertBotWork = function(botWork){
    // botWork.id = botWork.id ? botWork.id : moment().format('YYYYMMDDHHmmss');
    botWork.isSended = false;
    if(botWork.id){
        return botRepo.updateBotWork(botWork);
    }else{
        botWork.id = moment().format('YYYYMMDDHHmmss');
        return botRepo.addBotWork(botWork);
    }
}

exports.removeBotWork = function(id){
    return botRepo.removeBotWork(id);
}
