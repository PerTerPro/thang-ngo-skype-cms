
//----- Action ------
function init() {
    //Date picker
    // $('#time').datetimepicker({
    //      format: 'd/m/Y - H:i',
    //     //  lang: 'vi'
    // });
    this.botWork = JSON.parse(localStorage.getItem('botwork'));

    $('#time').daterangepicker({
        locale: {
            format: 'DD/MM/YYYY - HH:mm'
        },
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'), 10)
    });

    $('#timeOfDay').datetimepicker({
        datepicker: false,
        format: 'H:i'
    });

    $('#dayOfWeek').select2({
        maxHeight: 300
    });

    $('#month').select2({
        maxHeight: 300
    });

    $('#dayOfMonth').select2();


    var drpConfig = {
        locale: {
            format: 'DD/MM/YYYY'
        },
        // startDate: start,
        // endDate: end,
        ranges: {
            // 'Chỉ hôm nay thôi': [moment(), moment()],
            '7 Days': [moment(), moment().add(6, 'days')],
            '30 Days': [moment(), moment().add(29, 'days')],
            'Từ hôm nay đến hết tháng :D': [moment(), moment().endOf('month')],
            '1 Year': [moment(), moment().add(1, 'year')],
            '10 Years!': [moment(), moment().add(10, 'year')],
            '100 Years!!': [moment(), moment().add(100, 'year')]
        },
        parentEl: '#myModal'
    };

    $('#interval').daterangepicker(drpConfig);

    //  cb(start, end);

    $('input[name=typeTrigger]').change(function (val) {
        if (val.target.checked) {
            settingTypeTrigger(val.target.value);
        }
    })

}

function openModal() {
    settingTypeTrigger();
    $('#myModal').appendTo('body').modal('show');
}

function settingTypeTrigger(typeTrigger) {
    // var botWork = JSON.parse(localStorage.getItem('botwork'));
    // this.botWork = botWork;
    // this.botWork.trigger.typeTrigger = typeTrigger;
    // debugger;
    if (this.botWork.trigger) {
        typeTrigger = typeTrigger ? typeTrigger : this.botWork.trigger.typeTrigger;
        $('.trigger').addClass('hidden');
        switch (parseInt(typeTrigger)) {
            case 1:
                $('.oneTime-trigger').removeClass('hidden');
                $('#oneTime').click();

                if (this.botWork.id) {
                    $('#time').val(this.botWork.trigger.endDate + " - " + this.botWork.trigger.timeOfDay);
                    $('#time').data('daterangepicker').setStartDate(this.botWork.trigger.endDate + " - " + this.botWork.trigger.timeOfDay);
                    $('#time').data('daterangepicker').setEndDate('');
                }
                break;
            case 2:
                $('.daily-trigger').removeClass('hidden');
                $('#daily').click();

                $('#timeOfDay').val(this.botWork.trigger.timeOfDay);
                // $('#dailyTab #interval').val(botWork.startDate + " - " + botWork.endDate);
                cb('#interval', this.botWork.trigger.startDate, this.botWork.trigger.endDate);
                break;
            case 3:
                $('.weekly-trigger').removeClass('hidden');
                $('#weekly').click();

                $('#timeOfDay').val(this.botWork.trigger.timeOfDay);
                // debugger;
                $('#dayOfWeek').val(this.botWork.trigger.dayOfWeek).trigger("change");

                cb('#interval', this.botWork.trigger.startDate, this.botWork.trigger.endDate);
                break;
            case 4:
                $('.monthly-trigger').removeClass('hidden');
                $('#monthly').click();

                $('#timeOfDay').val(this.botWork.trigger.timeOfDay);
                $('#dayOfMonth').val(this.botWork.trigger.dayOfMonth).trigger("change");
                $('#month').val(this.botWork.trigger.month).trigger("change");
                cb('#interval', this.botWork.trigger.startDate, this.botWork.trigger.endDate);
                break;
            default:
                $('input[name=typeTrigger]').prop('checked', false);
                $('#myModal .radio').removeClass('checked');
                break;
        }
    }
}

function renderTrigger(trigger) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/botwork/renderTrigger",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": trigger,
        success: function (response) {
            $('.renderTrigger').html(response);
        },
        error: function (response) {
            // debugger;
        }
    }

    $.ajax(settings);
}


function addTrigger() {
    var typeTrigger = $('input[name=typeTrigger]:checked').val();
    var trigger = {
        typeTrigger: typeTrigger
    }

    switch (parseInt(typeTrigger)) {
        case 1:
            trigger.endDate = $.trim($('#time').val().split('-')[0])
            trigger.timeOfDay = $.trim($('#time').val().split('-')[1])
            break;
        case 2:
            trigger.startDate = $.trim($('#interval').val().split('-')[0])
            trigger.endDate = $.trim($('#interval').val().split('-')[1])
            trigger.timeOfDay = $.trim($('#timeOfDay').val())
            break;
        case 3:
            trigger.startDate = $.trim($('#interval').val().split('-')[0])
            trigger.endDate = $.trim($('#interval').val().split('-')[1])
            trigger.timeOfDay = $.trim($('#timeOfDay').val())

            // $('#dayOfWeek').val().split(',').forEach(day => {
            //     trigger.dayOfWeek = [];
            //     trigger.dayOfWeek.push(day);
            // });
            trigger.dayOfWeek = $('#dayOfWeek').val();

            break;
        case 4:
            trigger.startDate = $.trim($('#interval').val().split('-')[0])
            trigger.endDate = $.trim($('#interval').val().split('-')[1])
            trigger.timeOfDay = $.trim($('#timeOfDay').val())

            // $('#month').split(',').forEach(month => {
            //     trigger.month = [];
            //     trigger.month.push(month);
            // });
            // $('#dayOfMonth').val().split(',').forEach(day => {
            //     trigger.dayOfMonth = [];
            //     trigger.dayOfMonth.push(day);
            // });
            // trigger.month = $.trim($('#month').val())
            // trigger.dayOfMonth = $.trim($('#dayOfMonth').val())
            trigger.month = $('#month').val();
            trigger.dayOfMonth = $('#dayOfMonth').val();
            break;
        default:
            break;
    }

    this.botWork.trigger = trigger;
    renderTrigger(trigger);
    $('#myModal').modal('toggle');
}

function upsertBotwork() {
    common().loading('.card');
    // debugger;
    var botwork = $('form').serializeObject();
    this.botWork.name = $.trim(botwork.name);
    this.botWork.conversationSendId = $.trim(botwork.conversationSendId);
    this.botWork.message = $.trim(botwork.message);
    this.botWork.isEnabled = botwork.isEnabled ? true : false;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/botwork/upsertBotWork",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": this.botWork,
        success: function (response) {
            if (!response) {
                $('.workName').text($('[name=name]').val());
                common().showToast('success', 'Thông báo', 'Cập nhật thành công!');
            }
            else {
                common().showToast('success', 'Thông báo', 'Thêm mới thành công! Bạn sẽ được chuyển về trang danh sách', 2000);
                setTimeout(function () {
                    window.location.href = '/';
                }, 2000);
            }
            common().loaded('.card');
        },
        error: function (response) {
            console.log(response);
            common().loaded('.card');
        }
    }

    $.ajax(settings);
}


//-------- Init ---------  

var start = moment();
var end = moment().add(29, 'days');
function cb(element, start, end) {
    $(element).data('daterangepicker').setStartDate(start);
    $(element).data('daterangepicker').setEndDate(end);
}

$('[name=conversationSendId]').focusout(function () {
    if($(this).val()){
        conversationService().findByConversationId($(this).val()).success(function(response){
            $('[name=conversationSendIdName]').html(' - ' + response.name);
        });
    }
});