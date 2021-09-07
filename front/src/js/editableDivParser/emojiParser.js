const emojiRegex = require('emoji-regex');
import EditableDivParser from './editableDivParser.js';
import emojiUnicode from 'emoji-unicode';
class EmojiParser extends EditableDivParser{

    regexp = emojiRegex();

    constructor(node,emojisShortCodeIndex){
        super(node);
        this.emojisShortCodeIndex = emojisShortCodeIndex
    }

    /**
     * @name createNode
     * @description Crée un une image si le fichier existe, sinon crée l'emoji en simple texte
     * @param {String} shortCode 
     * @returns 
     */
    createNode(emoji) {
        let node = null
        try{
            node = this.createSpanImgNode(
                `<img class="emoji" alt="${emoji}" src="${require("@/assets/twemoji/svg/" + emojiUnicode(emoji) + ".svg")}">`
            )
        }catch(e){
            console.log(e)
            node = document.createTextNode(emoji)
        }
        return node;
    }

    /**
     * @name createSpanImgNode
     * @description Crée une Image en fonction du shortCode
     * @param {String} shortCode 
     * @returns 
     */
    createSpanImgNode(emoji){
        const span =  document.createElement('span');
        span.setAttribute('contenteditable','false');
        span.innerHTML = emoji;
        return span
    }

    /**
     * @name getListNodeToAppend
     * @description 
     * @param {*} shortCode 
     * @returns 
     */
    getListNodeToAppend(node){
        const listShortCodeNode = node.textContent
            .match(new RegExp(this.regexp,"g"))
            .map(match => this.createNode(match));
            

        return node.textContent
            .split(new RegExp(this.regexp,"g"))
            .map(text => document.createTextNode(text))
            .reduce((a,v,i)=> [...a,v,listShortCodeNode[i] ],[])
            .slice(0,-1);
    }




    /**
     * @name parse
     * @description 
     * @param {*} shortCode 
     * @returns 
     */
    parse(){
        const listNodes = [];
        this.node.childNodes.forEach(node => {
            if(this.regexp.test(node.textContent)){
                listNodes.push({
                    reference : node,
                    toAppend : this.getListNodeToAppend(node)
                });
            }
        });

        return listNodes;
    }

}

export default EmojiParser;