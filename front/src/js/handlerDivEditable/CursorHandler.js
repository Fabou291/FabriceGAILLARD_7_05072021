const NEXT = 1;
const PREVIOUS = -1;
class CursorHandler {
    node;

    temp = {
        cursorPosition: null,
        selection: null,
        focusNodeIndex: null,
        textContentLength: null,
        textLengthFocusNode: null,
        clonedNode: null,
    };

    addsZeroText = 0;
    removedTextZero = false;

    onDelete = {
        direction: 0,
    };

    constructor(node) {
        this.node = node;
    }

    setTempDatas() {
        this.setTempSelection();
        this.setTempCursorPosition(this.temp.selection);
        this.setTempTextContentLength();
        this.temp.textLengthFocusNode = this.temp.selection.focusNode.textContent.length;
        this.temp.clonedNode = this.node.cloneNode(true);
        this.temp.focusNodeIndex = [...this.node.childNodes].findIndex((e) => e == this.temp.selection.focusNode);
    }

    setTempSelection() {
        let { anchorOffset, focusOffset, anchorNode, focusNode } = window.getSelection();
        if (focusNode == this.node && this.node.lastChild) {
            focusNode = this.node.lastChild;
            focusOffset = focusNode.textContent.length;
        }
        this.temp.selection = { anchorOffset, focusOffset, anchorNode, focusNode, selection: window.getSelection() };
    }

    setTempCursorPosition(selection) {
        let position = 0;
        let offset = selection.focusOffset > selection.anchorOffset ? selection.focusOffset : selection.anchorOffset;

        for (let node of [...this.node.childNodes]) {
            if (node.nodeType != Node.TEXT_NODE) node = node.childNodes[0];
            if (node != selection.focusNode) position += node.textContent.length;
            else {
                position += offset;
                break;
            }
        }

        this.temp.cursorPosition = position;
    }

    selectionHaveImage() {
        for (let node of [...this.node.childNodes]) {
            if (node.nodeType != Node.TEXT_NODE) node = node.childNodes[0];
            if (node.nodeType != Node.ELEMENT_NODE) return true;
        }
        return false;
    }

    setTempTextContentLength() {
        this.temp.textContentLength = this.node.textContent.length;
    }

    replaceCursor() {
        const nbCharacterAfter = parseInt(this.node.textContent.length);
        const diff = nbCharacterAfter - this.temp.textContentLength;
        const selection = this.temp.selection;

        // -- Si l'on touche suppr
        if (this.onDelete.direction == NEXT && diff < 0) this.temp.cursorPosition++;

        // -- Considère le curseur position 1, s'il est sur un noeud "\u{FEFF}" position 1 et qu'on écrit (on ne supprime pas)
        if (
            this.temp.clonedNode.childNodes.length != 0 &&
            this.onDelete.direction == 0 &&
            selection.focusOffset == 0 &&
            this.temp.clonedNode.childNodes[this.temp.focusNodeIndex].textContent == "\u{FEFF}"
        ) {
            if (this.temp.focusNodeIndex == 0) this.temp.cursorPosition = 1;
            else this.temp.cursorPosition++;
        }

        //-- Détermine la position que devra prendre le curseur et le noeud sur lequel il doit être placé
        let count = 0;
        let nodeToReplaceCursor = null;
        for (const node of [...this.node.childNodes]) {
            if (count + node.textContent.length >= this.temp.cursorPosition + diff) {
                nodeToReplaceCursor = node;
                break;
            }
            count += node.textContent.length;
        }

        if(nodeToReplaceCursor){
            //-- Reajustement - Gere la suppression backspace
            if (

                this.onDelete.direction == PREVIOUS &&
                selection.focusOffset == 1 &&
                nodeToReplaceCursor.nextSibling &&
                diff != 0 &&
                !this.removedTextZero
            ) {
                nodeToReplaceCursor = nodeToReplaceCursor.nextSibling.nextSibling;
                this.temp.cursorPosition--;
            }

            //-- Reajustement -  Gere la suppression touche suppr
            if (
                this.onDelete.direction == NEXT &&
                selection.focusOffset == 1 &&
                this.temp.clonedNode.childNodes[this.temp.focusNodeIndex].textContent == "\u{FEFF}"
            ){
                this.temp.cursorPosition--;
            }
                
            if (
                nodeToReplaceCursor &&
                nodeToReplaceCursor.nextSibling &&
                this.onDelete.direction == NEXT &&
                selection.focusOffset == 0 
            ) {
                nodeToReplaceCursor = nodeToReplaceCursor.nextSibling.nextSibling;
                this.temp.cursorPosition--;
            }

            console.log({
                temp: { ...this.temp },
                count,
                nbCharacterAfter,
                diff,
            });

        

            if (nodeToReplaceCursor.nodeType != Node.TEXT_NODE) nodeToReplaceCursor = nodeToReplaceCursor.childNodes[0];
            window.getSelection().collapse(nodeToReplaceCursor, this.temp.cursorPosition - count + diff);            
        }


        this.onDelete.direction = 0;
        this.removedTextZero = false;
    }

    getNextNodeOnDelete(direction) {
        const selection = this.temp.selection;
        let nextSibling = direction == NEXT ? selection.focusNode.nextSibling : selection.focusNode.previousSibling;
        let offset = direction == NEXT ? 0 : 1;
        if (nextSibling && selection.focusOffset == offset && nextSibling.contentEditable == "false")
            return nextSibling.nextSibling;
    }

    getNextSibling(node, direction) {
        if (node.nodeType == Node.TEXT_NODE && node.parentNode != this.node)
            return this.getNextSibling(node.parentNode, direction);

        let nextSibling = direction == NEXT ? node.nextSibling : node.previousSibling;
        if (nextSibling == null) return null;
        if (nextSibling.contentEditable == "false") return this.getNextSibling(nextSibling, direction);
        if (nextSibling.nodeType == Node.ELEMENT_NODE) nextSibling = nextSibling.firstChild;

        return nextSibling;
    }

    haveSameParent(node1, node2) {
        return node1.parentNode == node2.parentNode;
    }

    move(e) {
        /* left = 37, up = 38, right = 39, down = 40 */
        const direction = e.keyCode == 37 ? PREVIOUS : NEXT;
        const selection = window.getSelection();
        if (selection.focusNode == this.node) return;

        let nextSibling = null;
        let nextPosition = selection.focusNode.textContent == "\u{FEFF}" ? direction * 2 : selection.focusOffset + direction;

        if (nextPosition > selection.focusNode.length || nextPosition < 0) {
            nextSibling = this.getNextSibling(selection.focusNode, direction);
            if (!nextSibling) return;

            nextPosition =
                nextPosition > selection.focusNode.length
                    ? (this.haveSameParent(nextSibling, selection.focusNode) ? 0 : 1).toString()
                    : this.haveSameParent(nextSibling, selection.focusNode)
                    ? nextSibling.textContent.length
                    : nextSibling.textContent.length - 1;
        }

        selection.collapse(
            nextSibling || selection.focusNode,
            parseInt(nextPosition !== null ? nextPosition : selection.focusOffset + direction)
        );
    }
}

export default CursorHandler;
