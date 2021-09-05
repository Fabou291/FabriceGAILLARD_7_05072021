import EditableDivParser from './editableDivParser.js';
class EmojiParser extends EditableDivParser{

    regexp = /:\w+:/;

    constructor(node,emojisShortCodeIndex){
        super(node);
        this.emojisShortCodeIndex = emojisShortCodeIndex
    }

    /**
     * @name createNode
     * @description Crée un l'élement adequat en fonction de la situation
     * @param {String} shortCode 
     * @returns 
     */
    createNode(shortCode){
        return (this.shortCodeExist(shortCode))
            ? this.createSpanImgNode(shortCode)
            : document.createTextNode(shortCode);
    }

    /**
     * @name createSpanImgNode
     * @description Crée une Image en fonction du shortCode
     * @param {String} shortCode 
     * @returns 
     */
    createSpanImgNode(shortCode){
        const span =  document.createElement('span');
        span.setAttribute('contenteditable','false');
        span.innerHTML = 
            `<img width="15px" alt="${shortCode}" src="${require("@/assets/twemoji/svg/" +
                this.emojisShortCodeIndex.get(shortCode).u.join("-").toLowerCase() +
            ".svg")}">`;
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
     * @name shortCodeExist
     * @description 
     * @param {*} shortCode 
     * @returns 
     */
    shortCodeExist(shortCode){
        return this.emojisShortCodeIndex.get(shortCode);
    }

    /**
     * @name hasAValidShortCode
     * @description 
     * @param {*} shortCode 
     * @returns 
     */
    hasAValidShortCode(content){
        for (const shortCode of content.match(new RegExp(this.regexp,"g")))
            if(this.shortCodeExist(shortCode)) return true;
        
        return false;
    }

    /**
     * @name parse
     * @description 
     * @param {*} shortCode 
     * @returns 
     */
    parse(){
        const listNodes = [];
        if(this.regexp.test(this.node.textContent)){
            
            this.node.childNodes.forEach(node => {
                if(this.regexp.test(node.textContent)){

                    if(this.hasAValidShortCode(node.textContent)){
                        listNodes.push({ 
                            reference : node, 
                            toAppend : this.getListNodeToAppend(node)
                        });                         
                    }

                }
            });

        }
        return listNodes;
    }

}

export default EmojiParser;