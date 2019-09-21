function removeBotWork(id, name){
    swal({
        title: "Thông báo",
        text: common().stringFormat("Bạn có chắc chắn muốn xóa <br><b>{0}</b>?", name),
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
                    "url": common().stringFormat("/botwork/removeBotWork?id={0}", id),
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (response) {
                        window.location.reload(false);                         
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