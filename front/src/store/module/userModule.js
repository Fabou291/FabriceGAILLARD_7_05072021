import HTTPRequest from "../../js/HTTPRequest/HTTPRequest.js"
import router from "../../router/index.js"
import JWT from "jsonwebtoken";


export default {
    namespaced : true,
    state: {
        id : null,
        username : null,
        avatar : null,
        role_id : null,
    },
    mutations: {
        UPDATE(state, user){
            state.id = user.id;
            state.username = user.username;
            state.avatar = user.avatar;
            state.role_id = user.role_id;
        }
    },
    actions: {

        async fetchLogin(context, body){
            try{
                const response = await HTTPRequest.post('auth/login', body);

                if(!response.ok) throw await response.json();
                
                const {user, accessToken} = await response.json();
                context.commit('UPDATE', user);

                window.localStorage.setItem('accessToken', accessToken);

                router.push({name : 'Home'})

            }
            catch(error){
                context.dispatch('errorModule/setError', error, { root: true })
            }
        },

        async register({dispatch},body){
            try{
                const response = await HTTPRequest.post('auth/register', body);

                if(!response.ok) throw await response.json();
                
                dispatch("fetchLogin", body)
            }
            catch(error){
                dispatch('errorModule/setError', error, { root: true })
            }
        },

        async getById(context,body){
            try{
                const decode = JWT.decode(body.accessToken, {complete: true});
                const response = await HTTPRequest.get(`user/${decode.payload.userId}`, {
                    'Authorization' : `Bearer ${ body.accessToken }` 
                });

                if(!response.ok) throw await response.json();
                
                const user = await response.json();
                context.commit('UPDATE', user);
                return true;
            }
            catch(error){
                context.dispatch('errorModule/setError', error, { root: true })
                return false;
            }
        },

        async refreshToken(context,body){
            try{
                const { userId, refreshToken } = body;
                const response = await HTTPRequest.post(`auth/refresh-token`,{ userId, refreshToken });

                if(!response.ok) throw await response.json();
                
                const accessToken = await response.json();

                window.localStorage.setItem('accessToken', accessToken);

                return true;
            }
            catch(error){
                context.dispatch('errorModule/setError', error, { root: true })
                return false;
            }
        }

    }
};