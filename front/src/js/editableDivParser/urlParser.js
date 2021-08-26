import EditableDivParser from './editableDivParser.js';
class UrlParser extends EditableDivParser{

    regexp = /https?:\/\/[www.]?[\w]+\.[\w()]+[-a-zA-Z0-9()@:%_+.~#?&/=]+/g;

    constructor(node){
        super(node)
    }

    parse(){

        const listNodes = [];

        this.node.childNodes.forEach(node => {
            const textContent = node.textContent;
            if(this.regexp.test(textContent)){
                const listTextNode = textContent.split(this.regexp).map(text => document.createTextNode(text));
                const listSpan = textContent.match(this.regexp).map(match => this.createSpanBlue(match));
                const listNodeToAppend = listTextNode.reduce((a,v,i)=> [...a,v,listSpan[i] ],[]).slice(0,-1);
                listNodes.push({ reference : node, toAppend : listNodeToAppend })
            }
            else if(node.nodeType == 1 && node.textContent != ''){ //si le noeud est un span blue le remplacer par un textNode
                listNodes.push({ reference : node, toAppend : [document.createTextNode(textContent)] })
            }
        })

        return listNodes;
    }



    createSpanBlue(text){
        const span =  document.createElement('span');
        span.setAttribute('style','color : blue');
        span.textContent = text;
        return span
    }

}

export default UrlParser;