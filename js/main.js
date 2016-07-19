$('.nav-sidebar-item').on('click', function (e) {
    e.preventDefault();

    $('.nav-sidebar-item').removeClass('active');
    $(this).addClass('active');

    openMiddlePane($(this).data('paneName'));
});

$('.js-upload-file').on('click', function (e) {
    $('.hidden-file-uploader').click();

    e.preventDefault();
});

$('.right-panel-close-btn').on('click', function () {
    var rightPanel = $(this).closest('.right-panel');
    var originalWidth = rightPanel.outerWidth();
    $('.middle-pane').removeClass('col-md-6').addClass('col-md-10');
    rightPanel.animate({'left': originalWidth}, 300, function () {
        rightPanel.hide();
    });
});

$('.js-send-reply').on('click', addReply);

$('.conversation-reply-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        addReply();
    }
});

function create_el(tag, parent, class_name, text, attr, title) {
    var e = document.createElement(tag);
    var $el = $(e);
    if (class_name) {
        e.className = class_name;
    }
    if (text) {
        $el.text(text);
    }
    if (attr) {
        $el.attr(attr);
    }
    if (title) {
        e.title = title;
    }
    if (parent) {
        parent[0].appendChild($el[0]);
    }
    return $el;
}

function addReply() {
    var replyContent = $('.conversation-reply-input').val();

    if (replyContent === '') {
        return;
    }

    var newConversationEntry = create_el('div', null, 'conversation-entry');
    create_el('img', newConversationEntry, 'conversation-avatar', '', {src: 'img/profile.jpg'});
    create_el('div', newConversationEntry, 'conversation-text', replyContent);

    $('.conversation-content')
        .append(newConversationEntry)
        .scrollTop($('.conversation-content')[0].scrollHeight);

    $('.conversation-reply-input').val('').focus();
}

function openMiddlePane(paneName) {
    $('.middle-pane').removeClass('is-active');
    $('.' + paneName + '-container').addClass('is-active');
}

function position() {
    $(".comments-hook").position({
        of: $("#comments-bar"),
        my: "center top",
        at: "left top",
        offset: "20 30",
        collision: "flip flip"
    });
}

function showComments(ms) {
    $("[class^=comments-entry-]").css('display', 'none');

    if (inRange(18800, ms)) {
        $('.comments-entry-18800').css('display', 'inline-block');

    } else if (inRange(37600, ms)) {
        $('.comments-entry-37600').css('display', 'inline-block');

    } else if (inRange(84600, ms)) {
        $('.comments-entry-84600').css('display', 'inline-block');

    } else if (inRange(112800, ms)) {
        $('.comments-entry-112800').css('display', 'inline-block');

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

$("#wave-slider").on("change", function (slideEvt) {
    $("#wave-slider-value").text(convertTime(slideEvt.value.newValue));
    showComments(slideEvt.value.newValue);
});
