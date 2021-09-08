export default class FocusHandler {
    tabbableElements = "a, input, textarea, button, *[contenteditable]";
    allTabbableElements;
    context;

    constructor(context) {
        this.context = context;
    }
    
    /**
     * @name setAllTabbableElements
     * @description Détermine tous les élements qui devront être focus
     */
    setAllTabbableElements(){
        this.allTabbableElements = this.context.querySelectorAll(this.tabbableElements);
    }

    /**
     * @name isFocusable
     * @description Détermine si un élement pourra prendre le focus ou non
     * @param {Object} element 
     * @returns {Boolean}
     */
    isFocusable = (element) =>
        window.getComputedStyle(element).visibility != "hidden" && window.getComputedStyle(element).display != "none";

    /**
     * @name getNextFocusableElements
     * @description Récupère le prochaine élement focusable
     * @param {Array}} allTabbableElements 
     * @param {Number} index 
     * @param {Number} direction 
     * @returns {Object}
     */    
    getNextFocusableElements(allTabbableElements, index, direction) {
        if (index > allTabbableElements.length - 1) index = 0;
        if (index < 0) index = allTabbableElements.length - 1;

        if (this.isFocusable(allTabbableElements[index])) return allTabbableElements[index];
        else return this.getNextFocusableElements(allTabbableElements, index + direction, direction);
    }

    /**
     * @name keyListener
     * @description Représente l'evenement à la touche TAB, 
     * permettant de focus le prochain noeud pouvant l'être
     * @param {Object} event 
     */
    keyListener = (event) => {
        this.setAllTabbableElements();
        const lastTabbableElement = this.getNextFocusableElements(
            this.allTabbableElements,
            this.allTabbableElements.length - 1,
            -1
        );
        
        const firstTabbableElement = this.getNextFocusableElements(this.allTabbableElements, 0, 1);

        if (event.keyCode === 9) {
            if (event.target === lastTabbableElement && !event.shiftKey) {
                event.preventDefault();
                firstTabbableElement.focus();
            } else if (event.target === firstTabbableElement && event.shiftKey) {
                event.preventDefault();
                lastTabbableElement.focus();
            }
        }
    };

    /**
     * @name setEvent
     * @description Ajoute l'evenement au container (context) d'element pouvant être focusable
     * @returns {undefined}
     */
    setEvent = () => this.context.addEventListener("keydown", this.keyListener, false);
     

    /**
     * @name removeEvent
     * @description Supprime l'evenement
     * @returns {undefined}
     */
    removeEvent = () => this.context.removeEventListener("keydown", this.keyListener, false);
}
