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
        setError( state, error) {
            state.commit("SET_ERROR", error);
        },
        parseError(state, error) {
            if(error.message == "access token expired"){
                //Faire un module AUTH pour cette fonction et d'autre
                state
                    .dispatch("userModule/getById", { accessToken: window.localStorage.getItem("accessToken") })
                    .then((accessTokenRefresh) => {
                        if(!accessTokenRefresh) router.push({ name: "Login" });
                        window.localStorage.setItem("accessToken", accessTokenRefresh.accessToken)
                    });                
            }
            else state.dispatch.setError( state, error) 
        },
    },
};
