class HandlerDivEditable{

    node;

    constructor(divEditable){
        this.node = divEditable
    }

    getSelection(){
        const { anchorOffset, focusOffset, anchorNode, focusNode } =  window.getSelection();
        return { anchorOffset, focusOffset, anchorNode, focusNode };
    }



    append(listNode){
        if(listNode.length > 0){
            const selection = this.getSelection();
            const listNodeBeforeAppend = [...this.node.childNodes];
            const nbCharacterBefore = parseInt(this.node.textContent.length);


            //APPEND
            listNode.forEach(node => {
                node.toAppend.forEach(n => {  this.node.insertBefore(n , node.reference) });
                this.node.removeChild(node.reference);
            })





            //REPLACER LE CURSEUR --- URL
            const nbCharacterAfter = parseInt(this.node.textContent.length);
            const diff = nbCharacterAfter - nbCharacterBefore;
            
            

            let position = 0;
            for (let node of listNodeBeforeAppend) {
                if(node.nodeType != Node.TEXT_NODE) node = node.childNodes[0];
                if(node != selection.focusNode) position += node.textContent.length;
                else{
                    position += selection.focusOffset
                    break; 
                }           
            }


            let count = 0;
            let nodeToReplaceCursor = null;
            for (const node of [...this.node.childNodes]) {
                if(count + node.textContent.length > position + diff){
                    nodeToReplaceCursor = node;
                    break;
                }
                count += node.textContent.length;                
            }
            
            console.log( position, diff, count, nodeToReplaceCursor)


            //si nodeToReplaceCursor == null, pas besoin de replace, car il n'y a pas de noeud apres ?
            if(nodeToReplaceCursor){
                if(nodeToReplaceCursor.nodeType != Node.TEXT_NODE ) nodeToReplaceCursor = nodeToReplaceCursor.childNodes[0]
                
                window.getSelection().collapse(nodeToReplaceCursor, position - count + diff)                
            }


        }

    }

    getTextContent() {
        let str = "";
        this.div.childNodes.forEach((node) => {
            if (node.nodeType == 1) { // 1 => Span
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

}

export default HandlerDivEditable;