import HTTPRequest from "@/js/HTTPRequest/HTTPRequest.js";

export default {
    namespaced: true,
    state: {
        listGroup : null
    },
    
    mutations : {
        SET_LIST_GROUP(state, listGroup){
            state.listGroup = listGroup;
        },
        UPDATE_LIST_GROUP(state, payload){
            state.listGroup[payload.index].push(payload.channel);
        }
    },
    actions : {
        async getListGroup(state){
            try{
                const results = await HTTPRequest.get('channel/byGroup', { 'Authorization' : 'Bearer ' +  window.localStorage.getItem('accessToken')});
                const listChannelByGroup = await results.json();
                state.commit('SET_LIST_GROUP', listChannelByGroup);
            }
            catch(error){
                console.log(error)
            }
        }
    }
}