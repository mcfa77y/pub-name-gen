$(function() {

    var logoData;
    var initCountValue = 2;
    $("#amount").val(initCountValue);
    $("#slider").slider({
        value: initCountValue,
        min: 1,
        max: 5,
        step: 1,
        slide: function(event, ui) {
            $("#amount").val(ui.value);
        },
        stop: function(event, ui) {
            getPage({
                noun1: window.logoData.noun1,
                noun2: window.logoData.noun2
            });
        }
    });

    var val = $("#amount").val();

    $('#tryAgain').click(function() {
        getPage();
    });

    $('[data-toggle="tooltip"]').tooltip();

    initAddToFavorite();
});

$('#swap').click(function() {
    var swapLogoData = {};
    swapLogoData.noun1 = logoData.noun2;
    swapLogoData.noun2 = logoData.noun1;
    swapLogoData.icons1 = logoData.icons2;
    swapLogoData.icons2 = logoData.icons1;
    $.extend(logoData, swapLogoData);
    renderPageWithData(logoData);
});

$('.image-wrap').click(function() {
    $('#myModal').on('shown.bs.modal', function() {
        $('#myInput').focus();
    });
});

function initAddToFavorite() {
    $('.addToFavorite').click(function() {
        console.log('hello' + this);
        $('span', $(this)).toggleClass("glyphicon glyphicon-plus glyphicon glyphicon-minus");
    });
}

function getPage(options) {
    options || (options = {});
    var val = $("#amount").val();
    var url = '/getLogo?count=' + val;
    var data = {};
    if (options.noun1) {
        url += '&noun1=' + options.noun1;
    }
    if (options.noun2) {
        url += '&noun2=' + options.noun2;
    }

    $.get(url, data, function(response_data) {
        logoData = response_data;
        renderPageWithData(response_data);
    });
}

function renderPageWithData(data) {
    $("#pub_name").html(Handlebars.templates.pub_name(data));
    $("#logoTable").html(Handlebars.templates.table(data));
    initAddToFavorite();

}


getPage();

Handlebars.registerHelper('getIt', function(obj, index, term) {
    var ret = obj[index][term];
    return ret;
});

Handlebars.registerHelper('randomColor', function(colors, index) {
    return "#" + colors[randomInt(0, colors.length)];
    // return "#" + colors[index];

});