"user strict";

const botworkService = require('../services').BotWorkService;
const commonUtil = require('../utils/common');
var _ = require('lodash');

// Module public methods.
module.exports = {
  renderHomePage: renderHomePage,
  renderContactPage: renderContact,
  renderSendAnonymousMessage:renderSendAnonymousMessage,
  renderTrigger: renderTrigger,
  // upsertBotWork:upsertBotWork,
  // removeBotWork:removeBotWork,
  api: {
    upsertBotWork: upsertBotWork,
    removeBotWork: removeBotWork
  }
};

/**
* @name renderHomePage
* @description
* Render homepage.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderHomePage(req, res) {
  // var conversationId = localStorage.getItem('conversationId');
  // var index = 
  // if(global.conversationId == undefined){
  //   return res.render('login', {
  //     layout: null // render without using a layout template
  //   });
  // }

  var cookies = commonUtil.parseCookies(req);
  if (cookies.xamlebotLogin) {
    var conversationId = decodeURIComponent(cookies.xamlebotLogin);
    if (conversationId) {
      if (req.query.botworkId != undefined) {
        if (req.query.botworkId > 0) {
          botworkService.getById(req.query.botworkId).then(function (result) {
            res.render('botworks/upsertbotwork', {
              title: 'Chỉnh sửa lời nhắn: ' + result.name,
              work: result.toJSON(),
              workString: JSON.stringify(result.toJSON())
            });
          })
        }
        else {
          var newBotWork = {
            id: undefined,
            name: '',
            conversationId: '',
            message: '',
            isEnabled: true,
            trigger: {
              typeTrigger: 0
            }
          };
          res.render('botworks/upsertbotwork', {
            title: 'Tạo lời nhắn mới',
            //Default value.
            work: newBotWork,
            workString: JSON.stringify(newBotWork)
          });
        }
      }
      else {
        botworkService.getAllWorkOfConversation(conversationId).then(function (result) {
          res.render('homepage', {
            works: result
          });
        });
        // res.send('This is homepage'); 
      }
    }
    else {      
      // window.location.href = '/login';      
      res.redirect('/login');
    }
  } else
    // window.location.href = '/login';
    res.redirect('/login');
}

/**
* @name renderSendAnonymousMessage
* @description
* Render SendAnonymousMessage page.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderSendAnonymousMessage(req, res) {
  res.render('anonymousMessage/sendAnonymousMessage',  
    {
    });
}

/**
* @name renderContact
* @description
* Render contact page.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderContact(req, res) {
  res.render('contact', {
    content: 'This is contact page content'
  });
}

function renderTrigger(req, res) {
  res.render("botworks/partials/renderTrigger",
    {
      layout: null, // render without using a layout template,
      trigger: req.body
    });
}


function upsertBotWork(req, res) {
  botworkService.upsertBotWork(req.body).then(function (data) {
    data.isNewWork = req.body.id ? false : true;
    res.status(200).json(data);
  })
}

function removeBotWork(req, res) {
  botworkService.removeBotWork(req.query.id).then(function (data) {
    res.status(200).json(data);
  })
}



