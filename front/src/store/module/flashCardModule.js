export default {
    namespaced: true,
    state: {
        message: null,
        statu : null,
        flashCardVisible : null
    },
    mutations: {
        SETUP(state,datas){
            state.message = datas.message;
            state.statu = datas.statu;
            state.flashCardVisible = datas.flashCardVisible;
        }
    },
    actions: {
        setFlashCard(context, datas){
            context.commit("SETUP", datas);
        },
        reset(context){
            context.commit("SETUP", {
                message : null,
                statu : null,
                flashCardVisible : null
            });
        }
    }
};
