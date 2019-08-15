/**
* @module routes
* @description
* Define all core routes of applications
*/
"user strict";

const coreCtrl = require('../controllers').Core;
const authenCtrl = require('../controllers').Authentication;

exports.init = function (app) {
    // app.route('/').get(coreCtrl.renderHomePage);
    app.route('/contact').get(coreCtrl.renderContactPage);
    app.route('/login')
        .get(authenCtrl.renderLogin)
        .post(authenCtrl.login);
    app.route('/').get(coreCtrl.renderHomePage);
    app.route('/botwork/renderTrigger').post(coreCtrl.renderTrigger);
    app.route('/botwork/upsertBotWork').post(coreCtrl.api.upsertBotWork);   
    app.route('/botwork/removeBotWork').post(coreCtrl.api.removeBotWork);
}

// module.exports = function(app) {
//   app.route('/').get(coreCtrl.renderHomePage);
//   app.route('/contact').get(coreCtrl.renderContactPage);
// };