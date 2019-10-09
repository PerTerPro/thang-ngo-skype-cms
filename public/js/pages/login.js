$(document).ready(function () {
    $('#conversationId').on('keypress', function (e) {
        if (e.which === 13) {
            $('#btnSubmit').click();
        }
    });

    $('[name=otp]').on('keypress', function (e) {
        if (e.which === 13) {
            $('#btnVerifyOtp').click();
        }
    });


    $('#btnSubmit').click(function () {
        var conversationId = $('#conversationId').val();
        if (!conversationId) {
            common().showToast('warning', 'Cảnh báo', 'Vui lòng nhập conversationId của bạn...');
            return;
        }
        common().loading('.card');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/login",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "conversationId": conversationId,
                "currentDatetime": moment().format('YYYYMMDDHHmmss')
            },
            success: function (response) {
                localStorage.setItem('currentDatetime', response);
                $('#verifyOtpModal').modal();

                // localStorage.setItem('username', response.name);
                // common().showToast('success', 'Thành công', 'Xác thực thành công. Bạn sẽ được chuyển về trang chủ...', 3000);
                // setTimeout(function () {
                // 	window.location.href = '/';
                // }, 3000);
            },
            error: function (response) {
                // debugger;
                common().showToast('warning', 'Cảnh báo', response.responseJSON.message);
                common().loaded('.card');
            }
        }

        $.ajax(settings);
    })

    $('#verifyOtpModal').on('shown.bs.modal', function () {
        $('[name=otp]').focus();
    })

    $('#verifyOtpModal').on('hidden.bs.modal', function () {
        common().loaded('.card');
    });


    $('#reSendOtp').click(function(){
        common().loading('.modal-content', 'Đang gửi OTP...');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/otp/reSendOtp",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "conversationId": $('#conversationId').val(),
                "currentDatetime": localStorage.getItem('currentDatetime')
            },
            success: function (response) {
                common().showToast('success', 'Thành công', 'Đã gửi OTP...', 3000);
                common().loaded('.modal-content');
            },
            error: function (response) {
                common().showToast('warning', 'Cảnh báo', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
                common().loaded('.modal-content');
            }
        }

        $.ajax(settings);
    })

    $('#btnVerifyOtp').click(function () {
        var otp = $('[name=otp]').val();
        if (!otp) {
            common().showToast('warning', 'Cảnh báo', 'Vui lòng nhập mã OTP...');
            return;
        }
        common().loading('.modal-content', 'Đang xác thực');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/otp/verifyOtp",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "otp": otp,
                "currentDatetime": localStorage.getItem('currentDatetime')
            },
            success: function (response) {
                common().showToast('success', 'Thành công', 'Xác thực thành công. Bạn sẽ được chuyển về trang chủ...', 3000);
                setTimeout(function () {
                    window.location.href = '/';
                }, 3000);
                localStorage.removeItem('currentDatetime');
            },
            error: function (response) {
                common().showToast('warning', 'Cảnh báo', response.responseText);
                common().loaded('.modal-content');
            }
        }

        $.ajax(settings);
    })
})