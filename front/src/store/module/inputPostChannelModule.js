import HandlerDivEditable from "../../js/handlerDivEditable/handlerDivEditable.js";
export default {
    namespaced: true,
    state: {
        textarea : null
    },
    getters : {
        getContent(state){
            const handlerDivEditable = new HandlerDivEditable(state.textarea);
            return handlerDivEditable.getTextContent();
        }
    },
    mutations: {
        SET_TEXTAREA(state, textarea){
            state.textarea = textarea;
        }
    },
};
