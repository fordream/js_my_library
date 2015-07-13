$(function() {
    $(".inlinde-edit").click(function() {
        if ($(this).children("input").length == 0) {
            edit(this);
        }
    });

    $(".inline-edit").keypress( function (e) {
        if (e.which == 13) {
            $(this).children("input").blur();
            return false;
        }
    });

})

function edit(box) {
    box.innerHTML = "<input id="" class='inline-edit-form form-control' type='text' value="" onblur=fieldBlur(this)>";
    box.firstChild.focus();
}

function fieldBlur(box) {
    $.ajax({
            url: "",
            type: "PUT",
            data: {
                sample: ""
            }
    });
}

function getPrice(price) {
    var p = price.split(/(万)|(億)|円/);
    p = $.grep(p, function(e){return e;});
    var num = p[0].replace(",", "");
    if (p[1] == "億") {
        num += "00000000"
    } else if (p[1] == "万") {
        num += "0000"
    }
    return num
}

