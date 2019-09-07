$.fn.serializeObject = function() {
    var o = Object.create(null),
        elementMapper = function(element) {
            element.name = $.camelCase(element.name);
            return element;
        },
        appendToResult = function(i, element) {
            var node = o[element.name];

            if ('undefined' != typeof node && node !== null) {
                o[element.name] = node.push ? node.push(element.value) : [node, element.value];
            } else {
                o[element.name] = element.value;
            }
        };

    $.each($.map(this.serializeArray(), elementMapper), appendToResult);
    return o;
};

function logout(){
    swal({
        title: "Bạn có chắc chắn muốn đăng xuất?",
        // text: "Đăng xuất?",
        html: true,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Đóng cửa sổ",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "/logout",
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (response) {
                        window.location.href = "/login";
                        swal.close();
                    },
                    
                    error: function (response) {
                        swal.close();
                    }
                }
            
                $.ajax(settings);
            }
            else {
                swal.close();
            }
        });
}