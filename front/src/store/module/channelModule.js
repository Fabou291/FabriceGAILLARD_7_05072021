import HTTPRequest from "@/js/HTTPRequest/HTTPRequest.js";
export default {
    namespaced: true,
    state: {
        panel : {
            groupChannel : {
                id : null,
                name : null
            },
            visible : false
        }
    },
    mutations : {
        closePanel(state){
            state.panel.visible = false;
            state.panel.groupChannel = { id : null, name : null };
        },
        openPanel(state, groupChannel){
            state.panel.groupChannel = groupChannel;
            state.panel.visible = true;
        }
    },
    actions : {
        create(state, body){
            HTTPRequest.post('channel/',{
                name : body.name,
                description : null,
                channel_group_id : state.groupChannel.id
            });
        },
        modify(state, body){
            HTTPRequest.put('channel/'+body.channel_id,{
                name : body.name,
                description : null,
                channel_group_id : state.groupChannel.id
            });
        }
    }
};