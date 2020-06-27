const timer: any = {
    id: null,
    run: function run(callback: () => void, time: number) {
        this.id = window.setTimeout(callback, time);
    },
    clean: function clean() {
        this.id = window.clearTimeout(this.id);
    }
};
const screenHeight = window.innerHeight;
export const getKeyboardHeight = (input: any, evt?: any): Promise<number> => {
    return new Promise((reslove) => {
        let keyboardHeight = 0;
        function timeRun(e: any) {
            if (!keyboardHeight) {
                timer.run(function a() {
                    if (screenHeight !== window.innerHeight) {
                        keyboardHeight = screenHeight - window.innerHeight;
                        console.log('keyboardHeight', keyboardHeight);
                        timer.clean();
                        reslove(keyboardHeight);
                    }
                }, 50);
            }
        }
        if (input) {
            input.addEventListener('focus', timeRun);
            // input.focus();
        } else {
            timeRun(evt);
        }
    });
};


/**
 * 设置光标位置 tips:使用原生方法获取element eg:document.getElementById
 * @param ele {Object} ele 输入框元素
 * @param pos {Number} pos 需要将光标设置的位置
 */
export const setCaretPosition = (ele: any, startPos: number, endPos: number = startPos) => {
    if (ele.setSelectionRange) {
        ele.focus();
        /* 选中输入框指定位置文本
        * selectionStart 起始位置
        * selectionEnd 终点位置
        * */
        console.log('startPos', startPos);
        console.log('endPos', endPos);
        ele.setSelectionRange(startPos, endPos);
    } else if (ele.createTextRange) { // IE
        const range: any = ele.createTextRange();
        range.collapse(true);
        range.moveEnd('character', startPos);
        range.moveStart('character', endPos);
        range.select();
    }
};
/**
 * 获取光标在输入框中相对位置
 * @param ele {object} [ele] 输入框元素对象 input/textarea
 * @return {int} 光标所处位置 根据字符长度值
 */
export const getCaretPosition = (ele: any) => {
    console.log('window.getSelection()', window.getSelection());
    let cursorPos = 0;
    const _document: any = document;
    if (_document.selection) { // IE
        const selectRange = _document.selection.createRange();
        console.log('selectRange', selectRange);
        selectRange.moveStart('character', -ele.value.length);
        cursorPos = selectRange.text.length;
    } else if (ele.selectionStart || ele.selectionStart === '0') {
        console.log('ele.selectionStart', ele.selectionStart);
        cursorPos = ele.selectionStart;
    }
    return cursorPos;
};

/**
 * https://blog.csdn.net/u011649976/article/details/83306408
 * 可编辑div获取光标位置
 * 获取当前光标位置
 * @param element
 */
export const getDivCursortPosition = (element: any) => {
    let caretOffset = 0;
    const doc: any = element.ownerDocument || element.document;
    const win: any = doc.defaultView || doc.parentWindow;
    let sel: any;
    if (typeof win.getSelection !== "undefined") {// 谷歌、火狐
        sel = win.getSelection();
        if (sel.rangeCount > 0) { // 选中的区域
            const range = win.getSelection().getRangeAt(0);
            const preCaretRange = range.cloneRange(); // 克隆一个选中区域
            preCaretRange.selectNodeContents(element); // 设置选中区域的节点内容为当前节点
            preCaretRange.setEnd(range.endContainer, range.endOffset);  // 重置选中区域的结束位置
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type !== "Control") { /*tslint:disable-line*/
        // IE
        const textRange = sel.createRange();
        const preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
};

/**
 * 设置光标位置 可编辑div设置光标位置
 * @param element
 * @param pos
 */
export const setDivCaretPosition = (element: Element, pos: number) => {
    let range: any;
    let selection: any;
    const _document: any = document;
    if (_document.createRange) {
        // Firefox, Chrome, Opera, Safari, IE 9+
        range = _document.createRange(); // 创建一个选中区域
        range.selectNodeContents(element); // 选中节点的内容
        if (element.innerHTML.length > 0) {
            range.setStart(element.childNodes[0], pos); // 设置光标起始为指定位置
        }
        range.collapse(true);       // 设置选中区域为一个点
        selection = window.getSelection(); // 获取当前选中区域
        selection && selection.removeAllRanges(); // 移出所有的选中范围
        selection && selection.addRange(range); // 添加新建的范围
    } else if (_document.selection) { // IE 8 and lower
        range = _document.body.createTextRange(); // Create a range (a range is a like the selection but invisible)
        range.moveToElementText(element); // Select the entire contents of the element with the range
        range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
        range.select(); // Select the range (make it the visible selection
    }
};
