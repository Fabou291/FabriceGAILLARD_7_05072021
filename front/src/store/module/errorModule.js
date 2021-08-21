
export default {
    namespaced: true,
    state: {
        error: null,
    },
    mutations: {
        SET_ERROR(state, error) {
            state.error = error;
        },
    },
    actions: {
        setError( state, error) {
            state.commit("SET_ERROR", error);
        },
        parseError(state, error) {
            if(error.message == "access token expired"){
                //Faire un module AUTH pour cette fonction et d'autre

                

            }
            else state.dispatch.setError( state, error) 
        },
    },
};
