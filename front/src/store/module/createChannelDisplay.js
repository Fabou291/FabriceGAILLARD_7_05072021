export default {
    namespaced: true,
    state: {
        activeGroupChannel : {
            id : null,
            name : null
        },
        visible : false
    },
    mutations : {
        CLOSE(state){
            state.visible = false;
            state.activeGroupChannel = { id : null, name : null };
        },
        OPEN(state, activeGroupChannel){
            state.activeGroupChannel = activeGroupChannel;
            state.visible = true;
        }
    },
    actions : {
    }
};