"user strict";

const conversationService = require('../services').ConversationService;
const commonUtil = require('../utils/common');
var _ = require('lodash');

// Module public methods.
module.exports = {
    api: {
        findByConversationId: findByConversationId
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function findByConversationId(req, res) {
    conversationService.findConversationWithConversationId(req.query.conversationId).then(function (data) {
        if (data != null) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ 'message': 'Không tồn tại người dùng này!' });
        };
    })
}