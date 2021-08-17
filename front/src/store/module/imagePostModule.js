export default {
    namespaced: true,
    state: {
        listFile : null,
        content : null,
    },
    mutations: {
        SET_CONTENT(state, content){
            state.content = content;
        },
        SET_FILE(state, listFile){
            state.listFile = listFile;
        }
    },
    actions: {
        open({commit},payload){
            commit('SET_FILE', payload.listFile);
            commit('SET_CONTENT', payload.content);
        },
        close({commit}){
            console.log("close")
            commit('SET_FILE', null);
            commit('SET_CONTENT', null);
        }
    },
};
