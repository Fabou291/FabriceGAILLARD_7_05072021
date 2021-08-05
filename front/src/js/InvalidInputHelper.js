export default class InvalidInputHelper{

    input;
    messages = {
        empty : "Veuillez renseigner ce champs.",
        invalid : null
    }
    validity = null;

    constructor(input,invalidMessage,validity = null){
        this.input = input;
        this.messages.invalid = invalidMessage;
        this.validity = validity
    }


    handleOnInvalid(){
        if(this.input.value == "") this.input.setCustomValidity(this.messages.empty)
        else this.input.setCustomValidity(this.messages.invalid)
    }

    handleOnInput(){
        if(this.input.validity.patternMismatch) this.handleOnInvalid();
        else this.input.setCustomValidity("")
    }

}