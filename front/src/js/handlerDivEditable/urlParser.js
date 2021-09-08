class UrlParser{

    regexp = /https?:\/\/[www.]?[\w]+\.[\w()]+[-a-zA-Z0-9()@:%_+.~#?&/=]+/g;
    node;
    
    constructor(node){
        this.node = node;
    }

    /**
     * @name parse
     * @description Analayse l'ensemble des noeuds, pour adapter leur contenu.
     * S'il correspond à une url, une span sera crée pour mettre en valeur le texte
     * @returns {Array} listNodes
     */
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


    /**
     * @name createSpanBlue
     * @description Crée un element Span
     * @param {String} text 
     * @returns 
     */
    createSpanBlue(text){
        const span =  document.createElement('span');
        span.className = "form-post__url"
        span.textContent = text;
        return span
    }

}

export default UrlParser;