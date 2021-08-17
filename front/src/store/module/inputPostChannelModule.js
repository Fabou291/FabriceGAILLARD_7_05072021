export default {
    namespaced: true,
    state: {
        content : null,
        textarea : null
    },
    mutations: {
        SET_CONTENT(state, content){
            state.content = content;
        },
        SET_TEXTAREA(state, textarea){
            state.textarea = textarea;
        }
    },
};
