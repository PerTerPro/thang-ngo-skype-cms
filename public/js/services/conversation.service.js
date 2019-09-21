var conversationService = function () {
    function findByConversationId(conversationId) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": common().stringFormat('/conversation/find-by-conversationId?conversationId={0}', conversationId),
            "method": "GET"
        }

        return $.ajax(settings);
    }

    return {
        findByConversationId: findByConversationId
    };
}


