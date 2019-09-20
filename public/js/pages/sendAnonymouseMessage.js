function sendMessage(conversationId, message, isAnonymous) {
  
  if(isAnonymous == undefined) isAnonymous = true; 

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": common().stringFormat("/send-anonymous-message?conversationId={0}&message={1}&isAnonymous={2}", conversationId, message, isAnonymous),
    "method": "POST",
    "headers": {
      "cache-control": "no-cache"
    },
    success: function (response) {
      console.log(response);
      common().showToast('success', 'Thông báo', response);
    },
    error: function (response) {
      debugger;
    }
  }

  $.ajax(settings);
}