import EditableDivParser from './editableDivParser.js';
class EmojiParser extends EditableDivParser{

    regexp = /:\w+:/;

    constructor(node,emojisShortCodeIndex){
        super(node);
        this.emojisShortCodeIndex = emojisShortCodeIndex
    }

    createNode(shortCode){
        return (this.shortCodeExist(shortCode))
            ? this.createSpanImgNode(shortCode)
            : document.createTextNode(shortCode);
    }

    createSpanImgNode(shortCode){
        const span =  document.createElement('span');
        span.setAttribute('contenteditable','false');
        span.innerHTML = 
            `<img width="15px" alt="${shortCode}" src="${require("@/assets/twemoji/svg/" +
                this.emojisShortCodeIndex.get(shortCode).u.join("-").toLowerCase() +
            ".svg")}">`;
        return span
    }

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

    shortCodeExist(shortCode){
        return this.emojisShortCodeIndex.get(shortCode);
    }

    hasAValidShortCode(content){
        for (const shortCode of content.match(new RegExp(this.regexp,"g")))
            if(this.shortCodeExist(shortCode)) return true;
        
        return false;
    }

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