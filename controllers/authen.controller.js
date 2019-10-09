"user strict";

const conversationService = require('../services').ConversationService;
const otpService = require('../services').OtpService;
const utilService = require('../services').UtilService;
const commonUtil = require('../utils/common');
var _ = require('lodash');

// Module public methods.
module.exports = {
  renderLogin: renderLogin,
  login: login,
  logout: logout,
  verificationOtp: verificationOtp,
  reSendOtp: reSendOtp
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
  else {
    res.redirect('/');
  }
}

function login(req, res) {
  conversationService.findConversationWithConversationId(req.body.conversationId).then(function (data) {
    if (data != null) {
      otpService.createOtp(req.body.currentDatetime, data.conversationId, 4).then(function (otpData) {
        var message = 'Mã OTP của bạn: ' + otpData.otp;
        utilService.sendMessage(otpData.conversationId, message);
        res.cookie('usernameLogin', data.name, { maxAge: 6 * 60 * 60 * 1000 }); 
        // res.cookie('xamlebotLogin', data.conversationId, { maxAge: 6 * 60 * 60 * 1000 });      
        // res.cookie('usernameLogin', data.name, { maxAge: 6 * 60 * 60 * 1000 });  
        
        otpService.removeMany({id: { $lte: otpData.id }, conversationId: otpData.conversationId, otp: { $ne: otpData.otp } }).then(function(res){
          // Xóa các OTP cũ.
        });

        res.status(200).json(otpData.id);
      })
    } else {
      res.status(404).json({ 'message': 'Không tồn tại người dùng này!' });
    };
  })
};

function logout(req, res) {
  res.clearCookie('xamlebotLogin');
  res.redirect("/login");
}

function reSendOtp(req, res) {
  otpService.createOtp(req.body.currentDatetime, req.body.conversationId, 4).then(function (otpData) {
    var message = 'Mã OTP của bạn: ' + otpData.otp;
    utilService.sendMessage(otpData.conversationId, message);
   
    otpService.removeMany({id: { $lte: otpData.id }, conversationId: otpData.conversationId, otp: { $ne: otpData.otp } }).then(function(res){
      // Xóa các OTP cũ.
    });
    res.status(200).json(otpData.id);
  })
}

function verificationOtp(req, res) {
  otpService.getByManyCondition({ id: req.body.currentDatetime, otp: req.body.otp }).then(function (data) {   
    if(data != null){
      otpService.remove(req.body.currentDatetime).then(function(dt){
        // remove otp sau khi xác thực thành công.
      });
      res.cookie('xamlebotLogin', data.conversationId, { maxAge: 6 * 60 * 60 * 1000 });          
      res.status(200).json('Xác thực thành công');   
    }
    else{
      res.status(404).json('Mã OTP không tồn tại.');  
    }   
  }).catch(function(err){
    res.status(500).json(err);
  })
}