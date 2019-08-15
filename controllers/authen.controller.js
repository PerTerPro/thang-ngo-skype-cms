"user strict";

const conversationService = require('../services').ConversationService;

// Module public methods.
module.exports = {
  renderLogin: renderLogin,
  login: login
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
  res.render('login', {
    layout: null // render without using a layout template
  });
}

function login(req, res) {
  conversationService.findConversationWithId(req.body.conversationId).then(function (data) {
    if (data != null) {
      res.status(200).json(data);
    } else {
      res.status(400).json({'message': 'Looix'});
    };
  })
};