
import UrlParser from "./urlParser.js";
import PostParser from "@/js/PostParser.js";
export default class EventHandler{

    HandlerDivEditable;
    UrlParser;

    constructor(HandlerDivEditable){
        this.HandlerDivEditable = HandlerDivEditable;
        this.UrlParser = new UrlParser(this.HandlerDivEditable.node);
    }

    /**
     * @name initialization
     * @description Ajoute l'ensemble des evements à l'élement cible
     */
    initialization(){
        const listEventPrevented = ['drop','dragenter','dragstart','drag'];
        listEventPrevented.forEach(eventName => this.HandlerDivEditable.node.addEventListener(eventName,this.preventDefault,true))

        this.HandlerDivEditable.node.addEventListener('paste',this.pasteHandler,false);
        this.HandlerDivEditable.node.addEventListener('keypress',this.keypressHandler,false);
        this.HandlerDivEditable.node.addEventListener('keydown',this.keydownHandler,false);
        this.HandlerDivEditable.node.addEventListener('keyup',this.keyupHandler,false);
        this.HandlerDivEditable.node.addEventListener('focusout',this.HandlerDivEditable.CursorHandler.setTempDatas,true);
        this.HandlerDivEditable.node.addEventListener('input',this.inputHandler,true);
    }

    /**
     * @name initialization
     * @description Remove tous les EventListener
     */
    removeEvent(){
        const listEventPrevented = ['drop','dragenter','dragstart','drag'];
        listEventPrevented.forEach(eventName => this.HandlerDivEditable.node.removeEventListener(eventName,this.preventDefault,true))

        this.HandlerDivEditable.node.removeEventListener('paste',this.pasteHandler,false);
        this.HandlerDivEditable.node.removeEventListener('keypress',this.keypressHandler,false);
        this.HandlerDivEditable.node.removeEventListener('keydown',this.keydownHandler,false);
        this.HandlerDivEditable.node.removeEventListener('keyup',this.keyupHandler,false);
        this.HandlerDivEditable.node.removeEventListener('focusout',this.HandlerDivEditable.CursorHandler.setTempDatas,true);
        this.HandlerDivEditable.node.removeEventListener('input',this.inputHandler,true);
    }

    preventDefault(e){
        e.preventDefault();
    }

    /**
     * @name pasteHandler
     * @description Gère l'évenement paste
     * Ajoute le contenu de ce qui a été copier à l'élement cible, parsé (emoji et fakeUrl)
     * @param {Object} e 
     * @returns 
     */
    pasteHandler = (e) => {
        e.preventDefault();
        let paste = new PostParser(e.clipboardData.getData("text").trim()).parseContent().parseEmoji().parseFakeUrl().content;
        const selection = window.getSelection();

        const spanNode = document.createElement('span');
        spanNode.innerHTML = paste;

        const temporaryNode = document.createTextNode('');

        if (!selection.rangeCount) return false;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(temporaryNode);
        
        let lastNode = spanNode.lastChild;

        [...spanNode.childNodes].forEach(node => {
            this.HandlerDivEditable.node.insertBefore(node,temporaryNode)
        })

        temporaryNode.parentNode.removeChild(temporaryNode);
        
        this.parseImgHasTextAround();


        lastNode = lastNode.nodeType == Node.TEXT_NODE 
        ? lastNode
        : ( lastNode.contentEditable != 'false' ) ? lastNode.firstChild : lastNode.nextSibling ;

        const offset = lastNode.nodeType == Node.TEXT_NODE 
        ? lastNode.length
        : ( lastNode.contentEditable != 'false' ) ? lastNode.firstChild.length : 0 ;

        window.getSelection().collapse(lastNode,offset)
        this.HandlerDivEditable.CursorHandler.setTempDatas();
    }

    /**
     * @name keydownHandler
     * @description Gère l'évenement keydown
     * @param {Object} e 
     * @returns 
     */
    keydownHandler = (e) => {
        this.HandlerDivEditable.CursorHandler.setTempDatas();
        if (e.keyCode == 8) this.backSpaceHandler();
        if (e.keyCode == 46) this.deleteHandler();
        if (e.keyCode == 37 || e.keyCode ==  39) this.HandlerDivEditable.CursorHandler.move(e);
        
        if(
            e.keyCode == 37 //left arrow
            || e.keyCode ==  39 //right arrow
            || (e.keyCode == 17 && e.keyCode ==  90)  //Ctrl+Z
            || (e.keyCode == 17 && e.keyCode ==  89) //Ctrl+Y
        ) e.preventDefault()
        
    }

    /**
     * @name keyupHandler
     * @description Gère l'évenement keyup
     */
    keyupHandler = () => {
        this.parseImgHasTextAround();
    }


    /**
     * @name deleteHandler
     * @description Gère l'évenement lors d'un delete (touche suppr)
     */
    deleteHandler = () =>  {
        this.HandlerDivEditable.CursorHandler.onDelete.direction = 1;
        this.removeTextZero();
    }

    /**
     * @name backSpaceHandler
     * @description Gère l'évenement lors d'un backspace (touche backspace)
     */
    backSpaceHandler = () => {
        this.HandlerDivEditable.CursorHandler.onDelete.direction = -1;
        this.removeTextZero();
    }

    /**
     * @name inputHandler
     * @description Gère l'évenemnt input
     */
    inputHandler = () =>{
        this.HandlerDivEditable.append(this.UrlParser.parse());
        this.parseImgHasTextAround();
        this.parseTextZero();
        this.HandlerDivEditable.node.normalize();
        this.HandlerDivEditable.parseEmpty();
        this.HandlerDivEditable.CursorHandler.replaceCursor();
    }

    /**
     * @name parseImgHasTextAround
     * @description Ajoute un textNode autour des images n'en ayant pas
     */
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

    /**
     * @name parseTextZero
     * @description Analyse/supprime le textZero lorsqu'il n'est pas seul dans le noeud
     */
    parseTextZero = () => {
        const reg = new RegExp("\u{FEFF}");
        [...this.HandlerDivEditable.node.childNodes].forEach((node) => {
            if (node.nodeType == Node.TEXT_NODE && node.textContent.length > 1 && reg.test(node.textContent))
                node.textContent = node.textContent.replace("\u{FEFF}", "");
        });
    }

    /**
     * @name removeTextZero
     * @description Supprime un noeud textZero lorsque rien d'autre n'est dans le contenu du noeud
     */
    removeTextZero = () => {
        const focusNode = window.getSelection().focusNode;
        const reg = new RegExp("\u{FEFF}");
        if (reg.test(focusNode.textContent) && focusNode.textContent.length == 1 && this.HandlerDivEditable.node.textContent.length > 1){
            focusNode.parentNode.removeChild(focusNode);
            this.HandlerDivEditable.CursorHandler.removedTextZero = true;
        }
    }
    
}