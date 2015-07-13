// 全角ひらがなを全角カタカナに変換する


// ひらがな文字であるか判別
function IsHiraganaCode(c) {
   return ((c >= 12353 && c <= 12435) || c == 12445 || c == 12446);
}

// 入力前の文字列を保持
var oldvalue = ""

// 文字が入力されたら実行
function toKatakanaCase(id) {
    var textbox = document.getElementById(id);
    if (oldvalue != textbox.value) {
        if (textbox.value.match(/[^ぁ-ん|^ー|^ァ-ン|^ヴぁ-ヴぉ]/g))
        {
            //平仮名＆片仮名以外
            return false;
        }
        else
        {
            //フォーカス位置取得
            var area;
            var range;
            var caret_position;

            if  (textbox.selectionStart || textbox.selectionStart == "0") { //firefox,chrome
                area = document.getElementById(id);
                range = window.getSelection();
                caret_position = area.selectionStart;
            }
            else if (document.selection) { // IE
                area = document.getElementById(id);
                range = document.selection.createRange();
                range.moveStart( "character", - area.value.length );
                caret_position = range.text.length;
            }

            var i, c, a = [];
            for(i=document.getElementById(id).value.length-1;0<=i;i--)
            {
                c = document.getElementById(id).value.charCodeAt(i);
                a[i] = (0x3041 <= c && c <= 0x3096) ? c + 0x0060 : c;
            };
            
            var value = String.fromCharCode.apply(null, a);
            var kana1 = new Array("カ゛","キ゛","ク゛","ケ゛","コ゛","サ゛","シ゛","ス゛","セ゛","ソ゛","タ゛","チ゛","ツ゛","テ゛","ト゛","ハ゛","ハ゜","ヒ゛","ヒ゜","フ゛","フ゜","ヘ゛","ヘ゜","ホ゛","ホ゜","ウ゛");
            var kana2 = new Array("ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ","ダ","ヂ","ヅ","デ","ド","バ","パ","ビ","ピ","ブ","プ","ベ","ペ","ボ","ポ","ヴ");
            for (i=0; 
                i<kana1.length; 
                i++) {
                    while (value.indexOf(kana1[i]) >= 0){
                        if (value.indexOf(kana1[i]) < caret_position-1) {
                            caret_position = caret_position-1;
                        }
                        value = value.replace(kana1[i], kana2[i]);
                    }
                }
            
            //変換後文字列格納
            document.getElementById(id).blur();
            document.getElementById(id).focus();
            document.getElementById(id).value = value;
            document.getElementById(id).blur();
            document.getElementById(id).focus();
            
            if (textbox.setSelectionRange){ //firefox,chrome
                //カーソル位置
                document.getElementById(id).setSelectionRange(caret_position, caret_position);
            }
            else if (textbox.createTextRange){// IE
                range.move("character", caret_position); 
                range.select();
            }

            oldvalue = document.getElementById(id).value;
        }
    }
 }

  //半角小文字を半角大文字に変換
function convertUpperCase(target) {

    var kanaromaUpper = document.getElementById(target);

    //フォーカス位置取得
    var area;
    var range;
    var caret_position;

    if  (document.getElementById(target).selectionStart || document.getElementById(target).selectionStart == "0") { //firefox,chrome
        area = document.getElementById(target);
        range = window.getSelection();
        caret_position = area.selectionStart;
    }
    else if (document.selection) { // IE
        area = document.getElementById(target);
        range = document.selection.createRange();
        range.moveStart( "character", - area.value.length );
        caret_position = range.text.length;
    }

    if (kanaromaUpper == undefined) return;
    kanaromaUpper.value = kanaromaUpper.value.toUpperCase();

    if (document.getElementById(target).setSelectionRange){ //firefox,chrome
        //カーソル位置
        document.getElementById(target).setSelectionRange(caret_position, caret_position);
    }
    else if (document.getElementById(target).createTextRange){// IE
        range.move("character", caret_position); 
        range.select();
    }
}

//入力項目精査（必須入力）
function isValidRequired(target, message)
{
    if(target.value != null && target.value != ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "text";
        setClassName(target,"text");
        return true;
    }else{
        message.style.display = "block";
        message.innerHTML = "未入力です。";
        //target.className = "text error";
        setClassName(target,"text error");
        return false;

    }
}


//入力項目精査（半角文字項目）
function isValidHalfWidth(target, message, isRequired)
{
    var result = true;
    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        var isHalf = true;
        var str = target.value;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
            // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
            if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                //半角文字の場合
            }else{
                //全角文字の場合
                isHalf = false;
                break;
            }
        }
    
        if(isHalf == true){
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            message.innerHTML = "半角でご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}


//入力項目精査（メールアドレス項目）
function isAtmark(target, message, isRequired)
{
    if(target.value.indexOf("@") != -1){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "text";
        setClassName(target,"text");
        return true;
    }else{
        message.style.display = "block";
        message.innerHTML = "＠をご入力ください。";
        //target.className = "text error";
        setClassName(target,"text error",isRequired);
        return false;
    }
}


//入力項目精査（半角英数字のみ許可項目）
function isValidAlphanumericCharacter(target, message, isRequired)
{
    var result = true;
    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[0-9A-Za-z]+$/) != null){
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            message.innerHTML = "半角英字または半角数字でご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}

//入力項目精査（半角数字のみ許可項目）
function isValidNumber(target, message,isRequired)
{
    var temp = "";
    if(message.innerHTML != "")
    {
    
        temp = message.innerHTML;
    }
    var result = true;
    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[0-9]+$/) != null&&temp!=null){
            message.style.display = "none";
            var targetID = target.id;
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            
            message.innerHTML = "半角数字でご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}

//IME制御
function imeModeCheck(target)
{
    if(target.style.imeMode == "auto")
    {
        target.style.imeMode = "disabled";
    }
    else if(target.style.imeMode == "active")
    {
        target.style.imeMode = "disabled";
    }
    else if(target.style.imeMode == "inactive")
    {
        target.style.imeMode = "disabled";
    }
    else if(target.style.imeMode == "")
    {
        target.style.imeMode = "disabled";
    }
}

//IME制御（IME活性化）
function imeModeOnCheck(target)
{
    if(target.style.imeMode == "auto")
    {
        target.style.imeMode = "active";
    }
    else if(target.style.imeMode == "disabled")
    {
        target.style.imeMode = "active";
    }
    else if(target.style.imeMode == "inactive")
    {
        target.style.imeMode = "active";
    }
    else if(target.style.imeMode == "")
    {
        target.style.imeMode = "active";
    }
}



//入力項目精査（全角のみ許可項目）
function isValidDoubleByteCharacter(target, message,isRequired)
{
    var result = true;
    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[^ -~｡-ﾟ]+$/) != null){
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            message.innerHTML = "全角でご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}

//入力項目精査（全角カナのみ許可項目）
function isValidDoubleByteKatakana(target, message,isRequired)
{
    var result = true;

    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
        
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[\u30A0-\u30FF]+$/) != null){
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            message.innerHTML = "全角カタカナでご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}

//入力項目精査（全角カナのみ許可項目）
function isValidDoubleByteKatakanaName(target, message,isRequired)
{
    var result = true;

    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
        
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[\u00A0-\u30FF]+$/) != null){
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            message.innerHTML = "全角カタカナでご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}

//入力項目精査（半角英字大文字のみ許可項目）
function isValidUppercase(target, message,isRequired)
{
    var result = true;
    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[A-Z/.]+$/) != null){
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            message.innerHTML = "半角大文字英字でご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}

//入力項目精査（半角英字大文字のみ許可項目）
function isValidUppercaseName(target, message,isRequired)
{
    var result = true;
    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[A-Z-\s-/.]+$/) != null){
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            message.innerHTML = "半角大文字英字でご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}

//入力項目精査（半角英数記号のみ許可項目）
function isValidAlphanumericMarkCharacter(target, message, isRequired)
{
    var result = true;
    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        target.className = "optional";
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[!-~]+$/) == null){
            message.style.display = "block";
            message.innerHTML = "半角英字または半角数字または半角記号でご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }else{
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }
    }else{
        return false;
    }
}

//メールアドレスチェック
function isValidMailAddress(target, message, isRequired)
{
    var result = true;
    //必須入力チェック
    result = isValidRequired(target, message);
    //必須チェックなしの項目で値が入力されていない場合、以後の処理を行わない
    if (isRequired != null && isRequired == false && result == false){
        message.style.display = "none";
        message.innerHTML = "";
        setClassName(target,"text");
        return true;
    }
    if (result == false){
        return false;
    }
    
    //半角文字項目チェック
    result = isValidHalfWidth(target, message, false);
    if (result == false){
        return false;
    }
    
    //メールアドレス項目チェック
    result = isAtmark(target, message,isRequired);
    if (result == false){
        return false;
    }
    return true;
}

function setClassName(target,targetClassName,isRequired){
    if(isRequired === undefined)
        isRequired = true; 
    //必須、任意、エラーのスタイルを削除
    var classNameStr = target.className;
    if(isRequired === true) {
        classNameStr = classNameStr.replace('text','');
        classNameStr = classNameStr.replace('error','');
        classNameStr = classNameStr.replace('indispensable','');
        classNameStr = classNameStr.replace('optional','');
        classNameStr = classNameStr.replace('Comm','');
        classNameStr = classNameStr + ' ' + targetClassName;
        target.className = classNameStr;
    }
}

//サロゲートペアチェック
function isSurrogate(target , resultId) {

    var input = target.value;
    //var result = document.getElementById(resultId);
    var moji = "";
    var hex = "";
    var judge = "";
    var checkmoji = "";
    len = input.length;
    //alert('input.length : ' + len);

    for (i = 0; i < len; i++) {

        str1 = input.charCodeAt(i);

        if (1 < input.length) {
            str2 = input.charCodeAt(i + 1);
        } else {
            str2 = 0;
        }

        // サロゲートペア判定
        if ((0xD800 <= str1 && str1 <= 0xDBFF) &&
         (0xDC00 <= str2 && str2 <= 0xDFFF)) {

            judge = "：無効な文字が含まれています。";
            moji += String.fromCharCode(str1, str2); // ペアで一文字
            setClassName(target,"text error");
            checkmoji = 1;
            hex += str1.toString(16).toUpperCase() + " " + str2.toString(16).toUpperCase() + " ";
            
            // 下位2バイトまで取得したので1文字スキップ
            i++;
            resultId.style.display = "block";

        } 
        
    }
    
            if(checkmoji != 1) {
            //moji += String.fromCharCode(str1);
            setClassName(target,"text");
            resultId.style.display = "none";
            hex += input.charCodeAt(i).toString(16).toUpperCase() + " ";
        }
    // 結果書き出し
    resultId.innerHTML =moji + judge;

}

//入力項目精査（全角カナ文字、ハイフン、数字のみ許可項目）
function isValidKatakanaNumCharHyphen(target, message,isRequired)
{
    var result = true;

    if (isRequired != null && isRequired == true){
        result = isValidRequired(target, message);
        
    }else if(target.value == null || target.value == ''){
        message.style.display = "none";
        message.innerHTML = "";
        //target.className = "optional";
        setClassName(target,"optional");
        return true;
    }
    
    if (result == true){
        if(target.value.match(/^[\u2010\uFF0D\uFF70\u30A0-\u30FF\uFF10-\uFF19]+$/) != null){
            message.style.display = "none";
            message.innerHTML = "";
            //target.className = "text";
            setClassName(target,"text");
            return true;
        }else{
            message.style.display = "block";
            message.innerHTML = "全角カタカナ、数字、ハイフンでご入力ください。";
            //target.className = "text error";
            setClassName(target,"text error",isRequired);
            return false;
        }
    }else{
        return false;
    }
}

// 複数テキストボックス 入力項目精査（半角数字のみ許可項目）
function isValidMultipleNumber(target, message, targetCount, isRequired) {
    var result = true;
    var messageText = "";
    var messageTmp = null;
    var targetTmp = target.id;
    var idx = targetTmp.length;
    targetTmp = targetTmp.substring(0, idx - 1);

    for (var i = 1; i <= targetCount; i++) {
        var targetID = targetTmp + i;

        var targetElement = document.getElementById(targetID)

        messageTmp = checkNumber(targetElement, message, isRequired);
        if (messageTmp != null) {
            result = false;
            messageText = messageTmp;
        }
    }

    if (result == true) {
        // エラーメッセージの変更
        message.style.display = "none";
        message.innerHTML = messageText;
        return true;
    } else {
        // エラーメッセージの変更
        message.style.display = "block";
        message.innerHTML = messageText;
        return false;
    }
}

// 複数用 入力項目精査（半角数字のみ許可項目）
function checkNumber(target, message,isRequired)
{
    var temp = "";
    if(message.innerHTML != "")
    {
        temp = message.innerHTML;
    }
    var messageTmp = null;

    if (isRequired != null && isRequired == true){
        // 未入力チェック
        messageTmp = checkRequired(target, message);
    }else if(target.value == null || target.value == ''){
        // スタイルの変更
        setClassName(target,"optional");
        return messageTmp;
    }
    
    if (messageTmp == null){
        if(target.value.match(/^[0-9]+$/) != null&&temp!=null){
            // スタイルの変更
            setClassName(target,"text");
            return null;
        }else{
            // スタイルの変更
            setClassName(target,"text error");
            return "半角数字でご入力ください。";
        }
    }else{
        return messageTmp;
    }
}

// 複数用 入力項目精査（必須入力）
function checkRequired(target, message)
{
    if(target.value != null && target.value != ''){
        // スタイルの変更
        setClassName(target,"text");
        return null;
    }else{
        // スタイルの変更
        setClassName(target,"text error");
        return "未入力です。";
    }
}

// 複数テキストボックス 入力項目精査（半角数字のみ許可項目 郵便番号専用
function isValidMultipleNumberV1800PostDedicated(targetBedinID, targetEndID, message, isRequired) {
    var result = true;
    var messageText = "";
    var messageTmp = null;

    messageTmp = checkNumber(targetBedinID, message, isRequired);
    if (messageTmp != null) {
        result = false;
        messageText = messageTmp;
    }

    messageTmp = checkNumber(targetEndID, message, isRequired);
    if (messageTmp != null) {
        result = false;
        messageText = messageTmp;
    }

    if (result == true) {
        // エラーメッセージの変更
        message.style.display = "none";
        message.innerHTML = messageText;
        return true;
    } else {
        // エラーメッセージの変更
        message.style.display = "block";
        message.innerHTML = messageText;
        return false;
    }
}