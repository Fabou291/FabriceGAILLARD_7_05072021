import HTTPRequest from "../../js/HTTPRequest/HTTPRequest.js"



export default {
    namespaced : true,
    state: {
        id : '',
        username : '',
        avatar : '',
        role_id : '',
        accessToken : ''
    },
    mutations: {
        UPDATE(state, {user , accessToken}){
            state.id = user.id;
            state.username = user.username;
            state.avatar = user.avatar;
            state.role_id = user.role_id;
            state.accessToken = accessToken;
        }
    },
    actions: {

        async fetchLogin({commit, dispatch}, body){
            try{
                const response = await HTTPRequest.post('auth/login', body);

                if(!response.ok) throw await response.json();
                
                commit('UPDATE', await response.json())
            }
            catch(error){
                dispatch('errorModule/setError', error, { root: true })
            }
        }

    }
};