import HTTPRequest from "../../js/HTTPRequest/HTTPRequest.js";
import router from "../../router/index.js";

export default {
    namespaced: true,
    state: {
        id: null,
        username: null,
        description: null,
        avatar: null,
        role_id: null,
        configDisplay : {
            visible : false
        }
    },
    mutations: {
        UPDATE(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.description = user.description;
            state.avatar = user.avatar;
            state.role_id = user.role_id;
        },
        SET_CONFIG_DISPLAY_VISIBLE(state, visibility){
            state.configDisplay.visible = visibility;
        }
    },
    getters: {
        user: (state) => {
            return {
                id: state.id,
                username: state.username,
                description : state.description,
                avatar: state.avatar,
                role_id: state.role_id,
            };
        },
    },
    actions: {
        async fetchLogin(context, body) {
            try {
                const { user, accessToken } = await HTTPRequest.post("auth/login", body);
                context.commit("UPDATE", user);
                window.localStorage.setItem("accessToken", accessToken);
                router.push({ name: "Home" });
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },

        async register({ dispatch }, body) {
            try {
                if((await HTTPRequest.post("auth/register", body)).affectdRows) dispatch("fetchLogin", body);
            } catch (error) {
                dispatch("errorModule/setError", error, { root: true });
            }
        },

        async getById(context, userId) {
            try {
                console.log(userId)
                context.commit("UPDATE", await HTTPRequest.get(`user/${userId}`));
            } catch (error) {

                context.dispatch("errorModule/handleError", error, { root: true });
            }
        },



        async modify({commit,state, dispatch}, body){
            try {
                
                const response = await HTTPRequest.put(`user/${state.id}`, HTTPRequest.convertToFormData(body), body.file ? true : false);

                commit('UPDATE', 
                    {
                        ...body,
                        id : state.id,
                        avatar : response.avatar,
                        role_id : state.role_id
                    }, 
                )

            } catch (error) {
                dispatch("errorModule/setError", error, { root: true });
            }
        },

        async remove({commit, dispatch}){
            try {
                await HTTPRequest.delete("user/1");

                commit('UPDATE', {
                    id : null, username : null, description : null,
                    avatar : null, role_id : null
                })

                router.push({ name: "Login" });

            } catch (error) {
                dispatch("errorModule/setError", error, { root: true });
            }
        },

        openConfigDisplay({commit}){
            commit('SET_CONFIG_DISPLAY_VISIBLE', true)
        },

        shutDownConfigDisplay({commit}){
            commit('SET_CONFIG_DISPLAY_VISIBLE', false)
        }
    },
};
