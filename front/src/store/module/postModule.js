import HTTPRequest from "../../js/HTTPRequest.js";

export default {
    namespaced: true,
    state: {
        idPostInModifyMode: null,
        idPostToReply: null,
        ActionListVisible : false,
        listPost: [],
    },
    getters: {
        getPostById : (state, getters) => (id,listPost) => {
            state;
            for (const post of listPost) {
                if(post.id == id) return post
                if(post.listComment.length > 0){
                    const a = getters.getPostById(id, post.listComment );
                    if(a) return a;
                }
            }
            return null;
        },
    },
    mutations: {
        SET_ACTION_LIST_VISIBLE(state, visibility) {
            state.ActionListVisible = visibility;
        },
        SET_ID_POST_IN_MODIFY_MODE(state, id) {
            state.idPostInModifyMode = id;
        },

        SET_ID_POST_TO_REPLY(state, id) {
            state.idPostToReply = id;
        },

        SET_LIST_POST(state, listPost) {
            state.listPost = listPost;
        },

        PUSH_LIST_POST(state, listPost) {
            state.listPost.push(...listPost);
        },

        ADD_POST(state, data) {
            const listPost = state.idPostToReply
                ? state.listPost.find((e) => e.id == state.idPostToReply).listComment
                : state.listPost;

            listPost.unshift({
                user_id: data.user.id,
                user_avatar: data.user.avatar,
                user_username: data.user.username,
                image_url : data.image_url,
                id: data.id,
                post_id: data.post_id,
                created_at: "Aujourd'hui",
                content: data.content,
                listComment: [],
                listReaction: [],
            });
        },

        ADD_REACTION(state, data){
            state;
            if(!data.listReaction) data.listReaction.push();
            else{
                const reaction = data.listReaction.find(e => e.emoji_unicode == data.emojiUnicode);
                if(reaction){
                    reaction.list_user_id.push(data.userId)
                    reaction.list_reaction_id.push(data.id)
                } 
                else data.listReaction.push({ emoji_unicode : data.emojiUnicode, list_user_id : [ data.userId ], list_reaction_id : [ data.id ] });
            }
        },

        REMOVE_REACTION(state, data){
            state;
            const reaction = data.listReaction.find(e => e.emoji_unicode == data.emojiUnicode);
            const list_user_id = reaction.list_user_id;

            
            if(list_user_id.length == 1)
                data.listReaction.splice(data.listReaction.indexOf(reaction),1);
            
            else{
                const index = reaction.list_reaction_id.indexOf(data.id);
                list_user_id.splice( index, 1 );
            }

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

        UPDATE_USER_OF_POST(state, user){
            const updateUser = (post) => {
                Object.assign(
                    post, 
                    { user_username : user.username, user_description : user.description, user_avatar : user.avatar }
                )
            }
            
            state.listPost.forEach(post => {
                if(post.user_id == user.id) updateUser(post);
                post.listComment.forEach(comment => { 
                    if(comment.user_id == user.id) updateUser(comment); 
                })
            });
        }
    },
    actions: {
        async getListPost(context, req) {
            try {
                context.commit(req.commit, await HTTPRequest.get(`channel/${req.channelId}/post?limit=${req.limit}&offset=${req.offset}`));
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },
        

        async addPost({ state, commit, dispatch, rootState }, payload) {
            try {
                const typeFormData = payload.file ? true : false;
                let body = { ...payload, postId: state.idPostToReply };
                if(body.file) body = HTTPRequest.convertToFormData(body) ;

                const response = await HTTPRequest.post("post/", body, typeFormData);

                commit("ADD_POST", {
                    id: response.id,
                    image_url: response.imageUrl,
                    content: payload.content,
                    post_id: state.idPostToReply,
                    user: rootState.userModule.user,
                });
                dispatch("setIdPostToReply", null);
                return response.id;
            } catch (error) {
                dispatch("errorModule/setError", error, { root: true });
            }
        },

        async modifyPost(context, post) {
            try {
                if ((await HTTPRequest.put(`post/${post.id}`, { content: post.content })).affectedRows) {
                    context.commit("MODIFY_POST", post);
                    context.commit("SET_ID_POST_IN_MODIFY_MODE", null);
                }
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },

        async removePost(context, post) {
            try {
                if ((await HTTPRequest.delete(`post/${post.id}`)).affectedRows) context.commit("REMOVE_POST", post);
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },

        async addReaction(context, body) {
            try {
                const id = (await HTTPRequest.post(`reaction/`, body)).insertId;
                const listReaction = context.getters.getPostById(body.postId, context.state.listPost).listReaction;
                context.commit("ADD_REACTION", {
                    ...body,
                    id,
                    listReaction, 
                    userId : context.rootState.userModule.user.id.toString()
                });
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },

        async removeReaction(context, payload) {
            try {
                await HTTPRequest.delete(`reaction/${payload.id}`);

                const listReaction = context.getters.getPostById(payload.postId, context.state.listPost).listReaction;
                context.commit("REMOVE_REACTION", {
                    ...payload,
                    listReaction
                });

            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },
        


        setIdPostToReply(state, id) {
            state.commit("SET_ID_POST_IN_MODIFY_MODE", null);
            state.commit("SET_ID_POST_TO_REPLY", id);
        },
    },
};
