/**
* @module routes
* @description
* Define all core routes of applications
*/
"user strict";

const coreCtrl = require('../controllers').Core;
const authenCtrl = require('../controllers').Authentication;
const conversationCtrl = require('../controllers').Conversation;

exports.init = function (app) {
    // app.route('/').get(coreCtrl.renderHomePage);
    app.route('/contact').get(coreCtrl.renderContactPage);
    app.route('/login')
        .get(authenCtrl.renderLogin)
        .post(authenCtrl.login);
    app.route('/logout')
        .post(authenCtrl.logout);
    app.route('/').get(coreCtrl.renderHomePage);
    app.route('/send-anonymous-message')
        .get(coreCtrl.renderSendAnonymousMessage)
        .post(coreCtrl.api.sendAnonymousMessage);
    app.route('/botwork/renderTrigger').post(coreCtrl.renderTrigger);
    app.route('/botwork/upsertBotWork').post(coreCtrl.api.upsertBotWork);   
    app.route('/botwork/removeBotWork').post(coreCtrl.api.removeBotWork);
    app.route('/otp/reSendOtp').post(authenCtrl.reSendOtp);
    app.route('/otp/verifyOtp').post(authenCtrl.verificationOtp);
    app.route('/conversation/find-by-conversationId').get(conversationCtrl.api.findByConversationId);
}

// module.exports = function(app) {
//   app.route('/').get(coreCtrl.renderHomePage);
//   app.route('/contact').get(coreCtrl.renderContactPage);
// };