export default {
    namespaced: true,
    state: {
        getContent : null,
        textarea : null
    },
    mutations: {
        SET_CONTENT(state, getContent){
            state.getContent = getContent;
        },
        SET_TEXTAREA(state, textarea){
            state.textarea = textarea;
        }
    },
};
