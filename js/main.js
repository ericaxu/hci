$('.nav-sidebar-item').on('click', function (e) {
    e.preventDefault();

    $('.nav-sidebar-item').removeClass('active');
    $(this).addClass('active');

    openMiddlePane($(this).data('paneName'));
});

function openMiddlePane(paneName) {
    $('.middle-pane').removeClass('is-active');
    $('.' + paneName + '-container').addClass('is-active');
}


function position() {
    $(".comments-hook").position ({
        of: $( "#comments-bar" ),
        my: "center top",
        at: "left top",
        offset: "20 30",
        collision: "flip flip"
    });
}

function showComments(ms) {
    $("[class^=comments-entry-]").css('display','none');

    if (inRange(18800, ms)) {
        $('.comments-entry-18800').css('display','inline-block');

    } else if (inRange(37600, ms)) {
        $('.comments-entry-37600').css('display','inline-block');

    } else if (inRange(84600, ms)) {
        $('.comments-entry-84600').css('display','inline-block');

    } else if (inRange(112800, ms)) {
        $('.comments-entry-112800').css('display','inline-block');

    }
}

function inRange(src_ms, val) {
    var showRangeInMS = 5000;
    return val >= (src_ms - showRangeInMS) && val <= (src_ms + showRangeInMS)
}

function convertTime(ms) {
    return new Date(ms).toISOString().slice(11, -1);
}

function setSliderValue(val) {
    $('#wave-slider').slider('setValue', val);
    $("#wave-slider-value").text(convertTime(val));
    showComments(val);
}

$("#wave-slider").on("change", function(slideEvt) {
    $("#wave-slider-value").text(convertTime(slideEvt.value.newValue));
    showComments(slideEvt.value.newValue);
});
