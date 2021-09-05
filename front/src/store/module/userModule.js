import HTTPRequest from "../../js/HTTPRequest.js";
import router from "../../router/index.js";

export default {
    namespaced: true,
    state: {
        user: {
            id: null,
            username: null,
            description: null,
            avatar: null,
            role_id: null,
        },
        configDisplay: {
            visible: false,
        },
    },
    mutations: {
        UPDATE(state, user) {
            ["password", "email", "refresh_token", "updated_at", "created_at_at"].forEach((e) => {
                if (user[e]) delete user[e];
            });

            state.user = user;
        },
        SET_CONFIG_DISPLAY_VISIBLE(state, visibility) {
            state.configDisplay.visible = visibility;
        },
    },

    actions: {
        async fetchLogin(context, body) {
            try {
                const { user, accessToken } = (await HTTPRequest.post("auth/login", body));
                context.commit("UPDATE", user);
                window.localStorage.setItem("accessToken", accessToken);
                router.push({ name: "Home" });
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },

        async register({ dispatch }, body) {
            try {
                if ((await HTTPRequest.post("auth/register", body)).affectedRows) dispatch("fetchLogin", body);
            } catch (error) {
                dispatch("errorModule/setError", error, { root: true });
            }
        },

        async getById(context, userId) {
            try {
                context.commit("UPDATE", await HTTPRequest.get(`user/${userId}`));
            } catch (error) {
                context.dispatch("errorModule/handleError", error, { root: true });
            }
        },

        async modify({ commit, state, dispatch }, payload) {
            try {
                let body = payload;
                const typeFormData = payload.file ? true : false;
                if (body.file) body = HTTPRequest.convertToFormData(body);

                const response = await HTTPRequest.put(`user/${state.user.id}`, body, typeFormData);

                commit("UPDATE", {
                    ...payload,
                    id: state.user.id,
                    avatar: response.avatar,
                    role_id: state.user.role_id,
                });
            } catch (error) {
                dispatch("errorModule/setError", error, { root: true });
            }
        },

        async remove({ commit, dispatch }) {
            try {
                await HTTPRequest.delete("user/1");

                commit("UPDATE", {
                    id: null,
                    username: null,
                    description: null,
                    avatar: null,
                    role_id: null,
                });

                router.push({ name: "Login" });
            } catch (error) {
                dispatch("errorModule/setError", error, { root: true });
            }
        },

        openConfigDisplay({ commit }) {
            commit("SET_CONFIG_DISPLAY_VISIBLE", true);
        },

        shutDownConfigDisplay({ commit }) {
            commit("SET_CONFIG_DISPLAY_VISIBLE", false);
        },
    },
};
