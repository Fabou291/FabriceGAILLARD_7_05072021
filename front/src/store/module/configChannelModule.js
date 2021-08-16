import HTTPRequest from '@/js/HTTPRequest/HTTPRequest.js';
export default {
    namespaced: true,
    state: {
        activeChannel : {
            id : null,
            name : null,
            description : null,
            channelGroupId : null,
        },
        visible : false
    },
    mutations : {
        CLOSE_CONFIG(state){
            state.visible = false;
            state.activeGroupChannel = {
                id : null,
                name : null,
                description : null,
                channelGroupId : null, 
            };
        },
        OPEN_CONFIG(state, activeChannel){
            state.activeChannel = activeChannel;
            state.visible = true;
        }
    },
    actions : {
        async remove({state,commit}) {
            try {
                if( (await HTTPRequest.delete(`channel/${state.activeChannel.id}`)).affectedRows ){
                    commit("sidebarModule/REMOVE_CHANNEL", state.activeChannel, { root : true });
                    commit("CLOSE_CONFIG")                    
                }else throw 'Nothing done';
            } catch (error) {
                console.log(error);
            }
        },
        async modify({state,commit},datas) {
            try {
                if( (await HTTPRequest.put(`channel/${state.activeChannel.id}`, { ...state.activeChannel, ...datas })).affectedRows ){
                    commit("sidebarModule/MODIFY_CHANNEL", { ...state.activeChannel, ...datas }, { root : true });
                    commit("CLOSE_CONFIG")                    
                }else throw 'Nothing done';
            } catch (error) {
                console.log(error);
            }
        },
    }
};