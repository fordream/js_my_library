// return 'YYYY/MM/DD'
function calendarFormatOfToday() {
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    return  y + '/' + m + '/' + d;
}