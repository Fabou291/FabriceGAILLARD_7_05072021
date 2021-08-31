export default class keepFocus {
    tabbableElements = `a, input, textarea, button`;

    allTabbableElements;
    context;

    constructor(context) {
        this.context = context;
        
    }

    setAllTabbableElements(){
        this.allTabbableElements = this.context.querySelectorAll(this.tabbableElements);
    }

    isFocusable = (element) =>
        window.getComputedStyle(element).visibility != "hidden" && window.getComputedStyle(element).display != "none";

    getNextFocusableElements(allTabbableElements, index, direction) {
        if (index > allTabbableElements.length - 1) index = 0;
        if (index < 0) index = allTabbableElements.length - 1;
        if (this.isFocusable(allTabbableElements[index])) return allTabbableElements[index];
        else return this.getNextFocusableElements(allTabbableElements, index + direction, direction);
    }

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

    setEvent = () => this.context.addEventListener("keydown", this.keyListener, false);

    removeEvent = () => this.context.removeEventListener("keydown", this.keyListener, false);
}
