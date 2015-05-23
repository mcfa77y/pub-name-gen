$(function() {

    var logoData;
    var initCountValue = 1;
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

    $('[data-toggle="tooltip"]').tooltip()
});

$('#swap').click(function() {
    logoData.swap = !logoData.swap;
    console.log('swap', logoData.swap);
    renderPageWithData(logoData);
});

$('.image-wrap').click(function() {
    $('#myModal').on('shown.bs.modal', function() {
        $('#myInput').focus();
    });
});

function getPage(options) {
    options || (options = {});
    var val = $("#amount").val();
    var url = 'getLogo?count=' + val;

    if (options.noun1) {
        url += '&noun1=' + options.noun1;
    }
    if (options.noun2) {
        url += '&noun2=' + options.noun2;
    }

    $.get(url, {}, function(data) {
        logoData = data;
        renderPageWithData(data);
    });
}

function renderPageWithData(data) {
    $("#pub_name").html(Handlebars.templates.pub_name(data));
    $("#logoTable").html(Handlebars.templates.table(data));
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