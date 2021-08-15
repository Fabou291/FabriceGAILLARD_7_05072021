import HTTPRequest from "../../js/HTTPRequest/HTTPRequest.js";
export default {
    namespaced: true,
    state: {
        idPostInModifyMode: null,
        idPostToReply: null,
        listPost: null,
    },
    mutations: {
        SET_ID_POST_IN_MODIFY_MODE(state, id) {
            state.idPostInModifyMode = id;
        },

        SET_ID_POST_TO_REPLY(state, id) {
            state.idPostToReply = id;
        },

        SET_LIST_POST(state, listPost) {
            state.listPost = listPost;
        },

        ADD_POST(state, data) {
            const listPost = state.idPostToReply
                ? state.listPost.find((e) => e.id == state.idPostToReply).listComment
                : state.listPost;

            listPost.unshift({
                user_id: data.user.id,
                user_avatar: data.user.avatar,
                user_username: data.user.username,
                id: data.id,
                post_id: data.post_id,
                created_at: "Aujourd'hui",
                content: data.content,
                listComment: [],
                listReaction: [],
            });
        },

        REMOVE_POST(state, post) {
            const listPost = post.post_id ? state.listPost.find((e) => e.id == post.post_id).listComment : state.listPost;
            listPost.splice(listPost.findIndex(e => e.id == post.id), 1);
        },

        MODIFY_POST(state, post) {
            const listPost = post.post_id
                ? state.listPost.find((e) => e.id == post.post_id).listComment
                : state.listPost.find((e) => e.id == post.id);
            listPost.content = post.content;
        },
    },
    actions: {
        async getListPost(state, channelId) {
            try {
                state.commit("SET_LIST_POST", await HTTPRequest.get(`channel/${channelId}/post?limit=10&offset=0`));
            } catch (e) {
                console.log(e);
            }
        },

        async addPost({ state, commit, dispatch, rootGetters }, body) {
            try {
                commit("ADD_POST", {
                    id: (await HTTPRequest.post("post/", { ...body, postId: state.idPostToReply })).insertId,
                    content: body.content,
                    post_id: state.idPostToReply,
                    user: rootGetters["userModule/user"],
                });
                dispatch("setIdPostToReply", null);
            } catch (e) {
                console.log(e);
            }
        },

        async modifyPost(state, post) {
            try {
                if ((await HTTPRequest.put(`post/${post.id}`, { content: post.content })).affectedRows) {
                    state.commit("MODIFY_POST", post);
                    state.commit("SET_ID_POST_IN_MODIFY_MODE", null);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async removePost(state, post) {
            try {
                if ((await HTTPRequest.delete(`post/${post.id}`)).affectedRows) state.commit("REMOVE_POST", post);
            } catch (e) {
                console.log(e);
            }
        },

        setIdPostToReply(state, id) {
            state.commit("SET_ID_POST_IN_MODIFY_MODE", null);
            state.commit("SET_ID_POST_TO_REPLY", id);
        },
    },
};
