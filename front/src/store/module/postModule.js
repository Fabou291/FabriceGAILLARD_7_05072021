import HTTPRequest from "../../js/HTTPRequest/HTTPRequest.js";
export default {
    namespaced: true,
    state: {
        idPostInModifyMode: null,
        idPostToReply: null,
        ActionListVisible : false,
        listPost: [],
    },
    getters: {
        getPostById : () => (id,listPost) => {

            for (const post of listPost) {
                if(post.id == id) return post
                if(post.listComment.length > 0) this.getPostById(id, post.listComment );
            }
            return null;
        }
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
                const reaction = data.listReaction.find(e => e.emoji_id == data.emojiId);
                if(reaction) reaction.push(data.user_id).filter((element,index, array) => array.indexOf(element) == index)
                else data.listReaction.push({ emoji_id : data.emojiId, list_user_id : [ data.userId ] });
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
                    if(post.user_id == user.id) updateUser(comment); 
                })
            });
        }
    },
    actions: {
        async getListPost(state, req) {
            try {
                state.commit(req.commit, await HTTPRequest.get(`channel/${req.channelId}/post?limit=${req.limit}&offset=${req.offset}`));
            } catch (e) {
                console.log(e);
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

        async addReaction(context, body) {
            try {
                if ((await HTTPRequest.post(`reaction/`, body)).affectedRows) {
                    const listReaction = context.getters.getPostById(body.postId, context.state.listPost).listReaction;
                    context.commit("ADD_REACTION", {...body, listReaction});
                }
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
