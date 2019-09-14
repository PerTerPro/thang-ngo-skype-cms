"user strict";

const conversationService = require('../services').ConversationService;
const commonUtil = require('../utils/common');
var _ = require('lodash');

// Module public methods.
module.exports = {
  renderLogin: renderLogin,
  login: login,
  logout: logout
};

/**
* @name renderLogin
* @description
* Render homepage.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderLogin(req, res) {
  var cookies = commonUtil.parseCookies(req);
  if (!cookies.xamlebotLogin) {
    res.render('login', {
      layout: null // render without using a layout template
    });
  }
  else{
    res.redirect('/');
  }
}

function login(req, res) {
  conversationService.findConversationWithConversationId(req.body.conversationId).then(function (data) {
    if (data != null) {
      // var index = _.findIndex(global.conversationId, x => x == data.conversationId);
      // if(index < 0){
      //   global.conversationId.push(data.conversationId);
      // }
      res.cookie('xamlebotLogin', data.conversationId, { maxAge: 6 * 60 * 60 * 1000 });      
      res.status(200).json(data);
    } else {
      res.status(400).json({ 'message': 'Looix' });
    };
  })
};

function logout(req, res) {
  res.clearCookie('xamlebotLogin');
  // res.redirect("/login");
}