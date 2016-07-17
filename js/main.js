$('.nav-sidebar-item--resources').on('click', function (e) {
    e.preventDefault();

    openMiddlePane('resource');
});

function openMiddlePane(paneName) {
    $('.middle-pane').removeClass('is-active');
    $('.' + paneName + '-container').addClass('is-active');
}