//import EmojiParser from "@/js/editableDivParser/emojiParser.js";
import UrlParser from "../editableDivParser/urlParser.js";
export default class EventHandler{

    HandlerDivEditable;
    UrlParser;

    constructor(HandlerDivEditable){
        this.HandlerDivEditable = HandlerDivEditable;
        this.UrlParser = new UrlParser(this.HandlerDivEditable.node);
        this.initialization()
    }

    initialization(){
        const listEventPrevented = ['drop','dragenter','dragstart','drag'];
        listEventPrevented.forEach(eventName => this.HandlerDivEditable.node.addEventListener(eventName,function(e){ e.preventDefault(); },true))

        this.HandlerDivEditable.node.addEventListener('paste',this.pasteHandler,true);
        this.HandlerDivEditable.node.addEventListener('keypress',this.keypressHandler,true);
        this.HandlerDivEditable.node.addEventListener('keydown',this.keydownHandler,true);
        this.HandlerDivEditable.node.addEventListener('focusout',this.HandlerDivEditable.CursorHandler.setTempDatas,true);
        this.HandlerDivEditable.node.addEventListener('input',this.inputHandler,true);
    }

    pasteHandler = (e) => {
        let paste = (e.clipboardData || window.clipboardData).getData("text").trim();
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        //this.HandlerDivEditable.append(EmojiParser.parse());
        //this.parseImgHasTextAround();
    }

    keypressHandler = (e) => {
        if (e.keyCode == 13 && e.keyCode == 16){
            e.preventDefault();
            this.addLine();
        }
    }

    keydownHandler = (e) => {
        this.HandlerDivEditable.CursorHandler.setTempDatas();
        if (e.keyCode == 8) this.backSpaceHandler();
        if (e.keyCode == 46) this.deleteHandler();

        if (e.keyCode == 37 || e.keyCode ==  39){
            e.preventDefault();
            this.HandlerDivEditable.CursorHandler.move(e);
        } 
        this.parseImgHasTextAround();
    }

    addLine() {
        console.log("retour chariot");
    }

    deleteHandler = () =>  {
        this.HandlerDivEditable.CursorHandler.onDelete.direction = 1;
        this.removeTextZero();
    }

    backSpaceHandler = () => {
        this.HandlerDivEditable.CursorHandler.onDelete.direction = -1;
        this.removeTextZero();
    }

    inputHandler = () =>{
        this.HandlerDivEditable.append(this.UrlParser.parse());
        this.parseImgHasTextAround();
        this.parseTextZero();
        this.HandlerDivEditable.node.normalize();
        this.HandlerDivEditable.parseEmpty();
        this.HandlerDivEditable.CursorHandler.replaceCursor();
    }

    parseImgHasTextAround = () => {
        [...this.HandlerDivEditable.node.childNodes].forEach((node) => {
            if (node.contentEditable == "false") {
                const previous = node.previousSibling;
                const next = node.nextSibling;

                if (!next || (next.nodeType != Node.TEXT_NODE && next.contentEditable == "false"))
                    node.after(this.HandlerDivEditable.createZeroText());

                if (!previous || (previous.nodeType != Node.TEXT_NODE && previous.contentEditable == "false"))
                    this.HandlerDivEditable.node.insertBefore(this.HandlerDivEditable.createZeroText(), node);
            }
        });
    }

    parseTextZero = () => {
        const reg = new RegExp("\u{FEFF}");
        [...this.HandlerDivEditable.node.childNodes].forEach((node) => {
            if (node.nodeType == Node.TEXT_NODE && node.textContent.length > 1 && reg.test(node.textContent))
                node.textContent = node.textContent.replace("\u{FEFF}", "");
        });
    }

    removeTextZero = () => {
        const focusNode = window.getSelection().focusNode;
        const reg = new RegExp("\u{FEFF}");
        if (reg.test(focusNode.textContent) && focusNode.textContent.length == 1 && this.HandlerDivEditable.node.textContent.length > 1){
            focusNode.parentNode.removeChild(focusNode);
            this.HandlerDivEditable.CursorHandler.removedTextZero = true;
        }
    }
    
}