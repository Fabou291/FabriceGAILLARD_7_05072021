//import EventHandler from "./eventHandler"
import CursorHandler from "./CursorHandler"
import emojiUnicode from "emoji-unicode"
class HandlerDivEditable{

    node;
    CursorHandler;
    eventHandler;

    constructor(node){
        this.node = node;
        this.CursorHandler = new CursorHandler(node);
        //this.eventHandler = new EventHandler(this);
    }

    /**
     * @name append
     * @description Ajoute un ensemble de noeud à la divEditable
     * @param {Object} listNode 
     */
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

    /**
     * @name getTextContent
     * @description Récupère le contenu du de la divEditable
     * @returns {String}
     */
    getTextContent() {
        let str = "";
        this.node.childNodes.forEach((node) => {
            if (node.nodeType == node.ELEMENT_NODE) { 
                str += node.querySelector("img") ? node.querySelector("img").alt : node.textContent;
            } else str += node.textContent || "";
        });
        return str;
    }

    /**
     * @name parseEmpty
     * @description Analayse la divEditable, pour la vider sous certaines conditions
     */
    parseEmpty() {
        if (this.getTextContent().replaceAll("\u{FEFF}", "") == ""){
            this.node.innerHTML = "";
        } 
    }

    /**
     * @name createZeroText
     * @description Crée un noeud textuel avec un caractère "vide"
     * @returns 
     */
    createZeroText() {
        return document.createTextNode("\u{FEFF}");
    }

    /**
     * @name createTextNode
     * @description Crée un noeud textuel en fonction du parametre
     * Si le paramètre est une chaine de caractère vide, le contenu sera celui d'un textZero
     * @param {String} innerContent 
     * @returns 
     */
    createTextNode(innerContent) {
        if(innerContent == '') return this.createZeroText();
        else return document.createTextNode(innerContent);
    }

    /**
     * @name createImgEmoji
     * @description Crée une image pour l'emoji
     * @param {String} emoji 
     * @returns 
     */
    createImgEmoji(emoji){
        const span =  document.createElement('span');
        span.setAttribute('contenteditable','false');
        span.innerHTML = 
            `<img class="emoji" alt="${emoji.emoji}" src="${require("@/assets/twemoji/svg/" +
                emojiUnicode(emoji.emoji).split(' ').join('-') +
            ".svg")}">`;
        return span;
    }



}

export default HandlerDivEditable;