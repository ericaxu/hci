$(".btn").mouseup(function(){
    $(this).blur();
});

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



//
//      Conversation Reply
//

$(document).on('click', ".hide-right", function(){
    var rightPanel = $(this).closest('.right-panel');
    var originalWidth = rightPanel.outerWidth();
    $('.middle-pane').removeClass('col-md-6').addClass('col-md-10');
    rightPanel.animate({'left': originalWidth}, 300, function () {
        rightPanel.hide();
    });
});


$(document).on('click', ".show-right", function(){
    var rightPanel = $('.right-panel');
    $('.middle-pane').removeClass('col-md-10').addClass('col-md-6');
    rightPanel.animate({'left': 0}, 300, function () {
        rightPanel.show();
    });
});



//
//      Conversation Reply
//

$('.js-send-reply').on('click', addReply);

$('.conversation-reply-input').on('keypress', function (e) {
    if (e.which === 13) {

        if ( $('#conversation-reply-input').data()['bs.popover'].tip().hasClass('in') ) {
            textToMusicTag();
        } else {
            addReply();
        }

    } else if (e.which === 35) {
        showTagPopover();

    } else if (e.which === 32) {
        hideTagPopover();
    }
});

$('.conversation-reply-input').on('keyup', function (e) {
    if (e.which === 8 || e.which === 27) {
        hideTagPopover();
    }
});


$('.js-create-conversation').on('click', createConversation);

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

    var newConversationEntry = create_el('div', null, 'conversation-entry pull-left');
    create_el('img', newConversationEntry, 'conversation-avatar', '', {src: 'img/profile.jpg'});

    var newConversationContent = create_el('div', newConversationEntry, 'conversation-text');

    var replyContentSplit = replyContent.split("#liberi_fatali ");
    var tag = "<button class='btn btn-xs btn-default music-tag show-right'><span class='glyphicon glyphicon-music'></span><span>&nbsp;&nbsp;liberi_fatali</span></button> ";
    var innerContentHTML = "";

    for (var i = 0; i < replyContentSplit.length; i++) {
        if (i != 0) { innerContentHTML += tag; }
        innerContentHTML += replyContentSplit[i];
    }

    newConversationContent.html(innerContentHTML);

    $('.conversation-content')
        .append(newConversationEntry)
        .scrollTop($('.conversation-content')[0].scrollHeight);

    $('.conversation-reply-input').val('').focus();
}

function createConversation() {
    var newConversationListItem = create_el('li');
    create_el('a', newConversationListItem, '', 'New conversation', {href: '#'});

    $('.conversation-sidebar-list').append(newConversationListItem);
}

function openMiddlePane(paneName) {
    $('.middle-pane').removeClass('is-active');
    $('.' + paneName + '-container').addClass('is-active');
}




//
//      Comments Bar
//

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



//
//      Music Panel Comments
//

// Addresses bug : https://github.com/twbs/bootstrap/issues/16732
// Solution from : https://github.com/twbs/bootstrap/pull/17702
$('body').on('hidden.bs.popover', function (e) {
    $(e.target).data("bs.popover").inState = { click: false, hover: false, focus: false }
});

$('#btn-add-comment').popover({
    html: true,
    placement: 'top',
    content: function() {
        return $("#add-comment-popover").html();
    }
});

function addCommentClose() {
    $('#btn-add-comment').popover('hide');
}



//
//      Music Tagging
//

$('#conversation-reply-input').popover({
    html: true,
    placement: 'top',
    trigger: "manual",
    content: function() {
        return $("#tagging-popover").html();
    }
});

function hideTagPopover() {
    $('#conversation-reply-input').popover('hide');
}

function showTagPopover() {
    $('#conversation-reply-input').popover('show');
}

function textToMusicTag() {
    var replyContent = $('.conversation-reply-input').val();
    var pos = replyContent.lastIndexOf("#");
    var newstring = replyContent.substring(0, pos).trim() + " #liberi_fatali ";

    $('.conversation-reply-input').val(newstring);
    hideTagPopover();
}

$('body').on('click', function (e) {
    if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('.popover.in').length === 0) {
        hideTagPopover();
    }
});