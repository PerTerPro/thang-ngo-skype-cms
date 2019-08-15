var common = function () {
    function stringFormat(text) {
        if (arguments.length <= 1) {
            return text;
        }
        var tokenCount = arguments.length - 2;
        for (var token = 0; token <= tokenCount; token++) {
            text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
        }
        return text;
    };

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //toast notify
    //position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    function showToast(type, title, message, timeout) {
        var options = {
            timeout: (timeout !== undefined) ? timeout : 5000,
            title: title,
            message: message
        };
        switch (type) {
            case "success":
                iziToast.success(options);
                break;
            case "error":
                iziToast.error(options);
                break;
            case "warning":
                iziToast.warning(options);
                break;
            case "info":
                iziToast.info(options);;
                break;
            default:
                iziToast.info(options);;
        }
    };

    function loading(elName, message, timeout) {
        message = message !== undefined ? message : 'Vui lòng chờ trong giây lát!';
        var options = {
            message: '<span class="text-semibold"><i class="icon-spinner4 spinner position-left"></i>&nbsp;' + message + '</span>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait'
            },
            css: {
                border: 0,
                padding: '10px 15px',
                color: '#fff',
                width: 'auto',
                '-webkit-border-radius': 2,
                '-moz-border-radius': 2,
                backgroundColor: '#333'
            }
        };

        if (timeout !== undefined)
            options.timeout = timeout;

        $(elName).block(options);
    }


    function loaded(elName) {
        setTimeout(function () { $(elName).unblock(); }, 200);
    }


    return {
        stringFormat: stringFormat,
        getUrlParameter: getUrlParameter,
        showToast: showToast,
        loading: loading,
        loaded: loaded
    };
}