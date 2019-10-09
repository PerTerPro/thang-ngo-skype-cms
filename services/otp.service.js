"use strict"

const otpRepo = require('../repositories').OtpRepo;
const utilService = require('./util.service');
const moment = require('moment');

exports.getById = function (otpId) {
    return otpRepo.getById(otpId);
}

exports.getByManyCondition = function(obj){
    return otpRepo.getByManyCondition(obj);
}

exports.add = function (otp) {
    return otpRepo.add(otp);
}

exports.remove = function (id) {
    return otpRepo.remove(id);
}

exports.removeMany = function (objQuery) {
    return otpRepo.removeManyByQuery(objQuery);
}

exports.createOtp = function (currentDatetime, conversationId, lengthOtp) {
    var otpStr = utilService.randomNumber(lengthOtp);
    var otp = {
        id: currentDatetime,
        conversationId: conversationId,
        otp: otpStr
    };
    return otpRepo.add(otp);
    // otpRepo.getById(currentDatetime).then(function (data) {
    //     if (data != null) {
    //         otpRepo.remove(data.id).then(function () {
    //             return otpRepo.add(otp);
    //         })
    //     } else {
    //         return otpRepo.add(otp);
    //     }
    // });
}