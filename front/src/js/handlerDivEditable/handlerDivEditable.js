import CursorHandler from "./CursorHandler"
class HandlerDivEditable{

    node;
    CursorHandler;

    constructor(divEditable){
        this.node = divEditable;
        this.CursorHandler = new CursorHandler(divEditable)
    }


    setTempDatas(){
        this.CursorHandler.setTempDatas();
    }

    append(listNode){
        if(listNode.length > 0){
            //APPEND
            listNode.forEach(node => {
                node.toAppend.forEach(n => this.node.insertBefore(n , node.reference) );
                this.node.removeChild(node.reference);
            })

            this.CursorHandler.replaceCursor();
        }
    }

    getTextContent() {
        let str = "";
        this.node.childNodes.forEach((node) => {
            if (node.nodeType == node.ELEMENT_NODE) { 
                str += node.querySelector("img") ? node.querySelector("img").alt : node.textContent;
            } else str += node.textContent || "";
        });
        return str;
    }

    parseEmpty() {
        if (this.handlerDivEditable.getTextContent().replaceAll("\u{FEFF}", "") == "") this.textarea.innerHTML = "";
    }

    createZeroText() {
        return document.createTextNode("\u{FEFF}");
    }

    createTextNode(innerContent) {
        if(innerContent == '') return this.createZeroText();
        else return document.createTextNode(innerContent);
    }

    createImgEmoji(emoji){
        const span =  document.createElement('span');
        span.setAttribute('contenteditable','false');
        span.innerHTML = 
            `<img width="19px" alt="${emoji.sc}" src="${require("@/assets/twemoji/svg/" +
                emoji.u.join("-").toLowerCase() +
            ".svg")}">`;
        return span;
    }

    move(event){
        this.CursorHandler.move(event);
    }

}

export default HandlerDivEditable;