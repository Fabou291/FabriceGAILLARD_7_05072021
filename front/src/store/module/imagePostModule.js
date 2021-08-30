export default {
    namespaced: true,
    state: {
        channelId : null,
        listFile : null,
        content : '',
    },
    mutations: {
        SET_CONTENT(state, content){
            state.content = content;
        },
        SET_FILE(state, listFile){
            state.listFile = listFile;
        },
        SET_CHANNEL_ID(state, channelId){
            state.channelId = channelId;
        }
    },
    actions: {
        open({commit},payload){
            console.log(payload.listFile)
            commit('SET_FILE', payload.listFile);
            commit('SET_CONTENT', payload.content);
        },
        close({commit}){
            commit('SET_FILE', null);
            commit('SET_CONTENT', '');
        }
    },
};
