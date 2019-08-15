"user strict";

const botworkService = require('../services').BotWorkService;

// Module public methods.
module.exports = {
  renderHomePage: renderHomePage,
  renderContactPage: renderContact,
  renderTrigger: renderTrigger,
  // upsertBotWork:upsertBotWork,
  // removeBotWork:removeBotWork,
  api: {
    upsertBotWork:upsertBotWork,
    removeBotWork:removeBotWork
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
  var conversationId = '29:1UxXLu0fePcHipKWVCSWWP410RtBxqew33YVfO9e_TAU';
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
          work: newBotWork.toJSON(),
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
    window.locaiton.href = '/login';
  }
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
