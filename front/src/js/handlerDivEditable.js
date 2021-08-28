class HandlerDivEditable{

    node;
    temp = {
        cursorPosition : null,
        selection : null,
        textContentLength : null
    }

    constructor(divEditable){
        this.node = divEditable
    }

    setTempSelection(){
        let { anchorOffset, focusOffset, anchorNode, focusNode } =  window.getSelection();
        if(focusNode == this.node && this.node.lastChild){
            focusNode = this.node.lastChild;
            focusOffset = focusNode.textContent.length
        }
        this.temp.selection = { anchorOffset, focusOffset, anchorNode, focusNode };
    }

    setTempCursorPosition(selection){
        let position = 0;
        for (let node of [...this.node.childNodes]) {
            if(node.nodeType != Node.TEXT_NODE) node = node.childNodes[0];
            if(node != selection.focusNode) position += node.textContent.length;
            else{
                position += selection.focusOffset
                break; 
            }           
        }
        this.temp.cursorPosition = position;
    }

    setTempTextContentLength(){
        this.temp.textContentLength = this.node.textContent.length;
    }

    setTempDatas(){
        //console.log("SETTEMP")
        this.setTempSelection()
        this.setTempCursorPosition(this.temp.selection)
        this.setTempTextContentLength()
    }



    append(listNode){
        if(listNode.length > 0){
            console.log(listNode)
            //APPEND
            listNode.forEach(node => {
                node.toAppend.forEach(n => this.node.insertBefore(n , node.reference) );
                this.node.removeChild(node.reference);
            })





            //REPLACER LE CURSEUR --- URL
            const nbCharacterAfter = parseInt(this.node.textContent.length);
            const diff = nbCharacterAfter - this.temp.textContentLength;
            
            




            let count = 0;
            let nodeToReplaceCursor = null;
            for (const node of [...this.node.childNodes]) {
                if(count + node.textContent.length > this.temp.cursorPosition + diff){
                    nodeToReplaceCursor = node;
                    break;
                }
                count += node.textContent.length;                
            }
            
            console.log( this.temp.cursorPosition, diff, count, nodeToReplaceCursor)


            //si nodeToReplaceCursor == null, pas besoin de replace, car il n'y a pas de noeud apres ?
            if(nodeToReplaceCursor){
                if(nodeToReplaceCursor.nodeType != Node.TEXT_NODE ) nodeToReplaceCursor = nodeToReplaceCursor.childNodes[0]
                window.getSelection().collapse(nodeToReplaceCursor, this.temp.cursorPosition - count + diff)                
            }
            else{
                window.getSelection().collapse(
                    this.node.lastChild, 
                    this.node.lastChild.length
                ) 
            }

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

}

export default HandlerDivEditable;