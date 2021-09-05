import router from "../../router/index.js";
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
        setError( context, error) {
            context.commit("SET_ERROR", error);
        },
        handleError(context, error) {
            if(error.message == "Failed to fetch"){
                router.push({ name: "Login" })
                error = { message : 'Server not responding' }
            }

            context.dispatch('setError', error) 
        },
    },
};
