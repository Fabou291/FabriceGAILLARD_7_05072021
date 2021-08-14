import HTTPRequest from "../../js/HTTPRequest/HTTPRequest.js";
export default {
    namespaced: true,
    state: {
        idPostInModifyMode: null,
        listPost:null
    },
    mutations: {
        SET_ID_POST_IN_MODIFY_MODE(state, id) {
            state.idPostInModifyMode = id;
        },
        ADD_POST(state, data){
            state.listPost.unshift({
                user_id: data.user.id,
                user_avatar: data.user.avatar,
                user_username: data.user.username,
                id : data.id,
                created_at: "Aujourd'hui",
                content : data.content,
                listComment: [],
                listReaction : []
            });
        },
        REMOVE_POST(state, id){
            state.listPost.splice(state.listPost.findIndex(e => e.id == id),1);
        },
        MODIFY_POST(state, post){
            state.listPost[state.listPost.findIndex(e => e.id == post.id)].content = post.content
        },
        SET_LIST_POST(state,listPost){
            state.listPost = listPost;
        }
    },
    actions: {
        async getListPost(state, channelId) {
            try {
                const response = await HTTPRequest.get(`channel/${channelId}/post?limit=10&offset=0`);
                if(!response.ok) throw response;
                state.commit('SET_LIST_POST',await response.json());
            } catch (e) {
                console.log(e);
            }
        },
        async addPost(state, body) {
            try{
                const response = await HTTPRequest.post('post/', body)
                if(!response.ok) throw response;
                const data = await response.json();
                state.commit('ADD_POST', { id : data.insertId, content : body.content, user : state.rootGetters['userModule/user']});
            }catch(e){
                console.log(e)
            }
        },
        async modifyPost(state, post) {
            try{
                const response = await HTTPRequest.put(`post/${post.id}`, { content : post.content });
                if(!response.ok) throw response;
                state.commit('MODIFY_POST', post);
                state.commit('SET_ID_POST_IN_MODIFY_MODE',null);
            }catch(e){
                console.log(e)
            }
        },
        async removePost(state, post){
            try {
                const response = await HTTPRequest.delete(`post/${post.id}`);
                if(!response.ok) throw response;
                const data = await response.json();

                if(data.affectedRows) state.commit('REMOVE_POST',post.id);
            } catch (e) {
                console.log(e);
            }
        },
    },
};
