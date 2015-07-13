$(function() {
    $("#select2").select2({
        minimumInputLength: 1,
        ajax: {
            url: "",
            datatype: "json",
            delay: 250,
            data: function(params) {
                return {
                    name: params,
                }
            },
            results: function(data) {
                return {
                    results: $.map(data, function(item) {
                        return {
                            id: item.id,
                            text: item.name,
                        }
                    })
                }
            }
        },
        escapeMarkup: function (m) { return m; },
        createSearchChoice: function(term, data) {
            if ($(data).filter(function() {return this.text.localeCompare(term)===0; }).length===0) {
                return {id:term, text:term};
            }
        },
        formatResult: formatResultOfInCharges,
        formatSelection: formatSelectionOfInCharges,
    });

    $("#select2").on("change", function() {
        // on change
    });
});

function formatResultOfInCharges(state) {
    if (isNaN(state.id)) {
        return "<div>" + state.text + "<p class='text-success'></p></div>";
    } else {
        return "<div>" + state.text + "<p class='text-primary'></p></div>";
    }
}

function formatSelectionOfInCharges(state) {
    if (isNaN(state.id)) {
        return "<div>" + state.text + "<span class='text-success'></span></div>";
    } else {
        return "<div>" + state.text + "<span class='text-primary'></span></div>";
    }
}