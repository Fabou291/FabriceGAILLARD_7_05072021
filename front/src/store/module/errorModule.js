export default {
    namespaced : true,
    state : {
        error : null
    },
    mutations : {
        SET_ERROR(state, error){
            state.error = error;
        }
    },
    actions : {
        setError({commit},error){
            commit('SET_ERROR', error);
        }
    }
}