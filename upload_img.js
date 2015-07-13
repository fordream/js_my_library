// <div class="img-input">
//    <label>
//        <input type='file'>
//        <img class='before-img'>
//    </label>
// </div>

$(function() {
    $('.img-input').find('input[type=file]').change(function () {
        if (this.files.length) {
            var file = $(this).prop('files')[0],
                fileReader = new FileReader();
            fileReader.onload = function () {
                $('.before-img').attr('src', fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    })
});
