import HTTPRequest from "../../js/HTTPRequest/HTTPRequest.js";
import router from "../../router/index.js";
import JWT from "jsonwebtoken";

export default {
    namespaced: true,
    state: {
        id: null,
        username: null,
        avatar: null,
        role_id: null,
    },
    mutations: {
        UPDATE(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.avatar = user.avatar;
            state.role_id = user.role_id;
        },
    },
    getters: {
        user: (state) => {
            return {
                id: state.id,
                username: state.username,
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
                await HTTPRequest.post("auth/register", body);
                dispatch("fetchLogin", body);
            } catch (error) {
                dispatch("errorModule/setError", error, { root: true });
            }
        },

        async getById(context, body) {
            try {
                const decode = JWT.decode(body.accessToken, { complete: true });
                context.commit("UPDATE", await HTTPRequest.get(`user/${decode.payload.userId}`));
                return true;
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
                return false;
            }
        },

        async refreshToken(context, body) {
            try {
                const { userId, refreshToken } = body;
                window.localStorage.setItem(
                    "accessToken",
                    await HTTPRequest.post(`auth/refresh-token`, { userId, refreshToken })
                );
                return true;
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
                return false;
            }
        },
    },
};
