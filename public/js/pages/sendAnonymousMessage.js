function sendMessage(conversationId, message, isAnonymous) {
  
  if(isAnonymous == undefined) isAnonymous = true; 

  var settings = {
    'async': true,
    'crossDomain': true,
    'url': '/send-anonymous-message',
    'method': 'POST',
    'headers': {
      'cache-control': 'no-cache'
    },
    'data':{
      conversationId: conversationId,
      message: message,
      isAnonymous: isAnonymous
    },
    success: function (response) {
      console.log(response);
      common().showToast('success', 'Thông báo', response);
    },
    error: function (response) {
      common().showToast('error', 'Thông báo', response);      
    }
  }

  $.ajax(settings);
}