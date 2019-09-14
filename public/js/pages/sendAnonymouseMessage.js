function sendMessage(conversationId, message, isAnonymous) {

  if (isAnonymous) {
    message += common().stringFormat(" - Từ {0}", localStorage.getItem('username'));
  }

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": common().stringFormat("https://thang-ngo-bot.herokuapp.com/sendMessage?conversationId={0}&message={1}", conversationId, message),
    "method": "GET",
    "headers": {
      "cache-control": "no-cache"
    },
    success: function (response) {
      console.log(response);
      common().showToast('success', 'Thông báo', 'Gửi thành công');
    },
    error: function (response) {
      debugger;
    }
  }

  $.ajax(settings);
}