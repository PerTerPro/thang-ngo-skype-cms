const coreCtrl = require('./core.server.controller');
const authenCtrl = require('./authen.controller');

module.exports = {
    Core: coreCtrl,
    Authentication: authenCtrl
};