function ajaxRequest(url, input) {
    $.ajax({
            url: url,
            type: "GET",
            data: { name: input,
                place: location.pathname }}
    )
}

function sendAjaxWhenKeyUp(inputId, url) {
    var preFunc = null, preInput = "";
    $(inputId).keyup( function() {
        var input = $.trim($(this).val());
        if(preInput !== input) {
            clearTimeout(preFunc);
            preFunc = setTimeout(ajaxRequest(url, input), 500);
        }
        preInput = input;
    });
}