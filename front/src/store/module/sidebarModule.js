import HTTPRequest from "@/js/HTTPRequest.js";

export default {
    namespaced: true,
    state: {
        listGroup: null,
        visible : false
    },
    getters : {
        getChannelById: state => id => {
            if(!state.listGroup) return {}
            return state.listGroup.reduce( (a,e) => a = a.concat(e.listChannel), []).find(e => e.id == id);
        }
    },
    mutations: {
        SET_LIST_GROUP(state, listGroup) {
            state.listGroup = listGroup;
        },
        ADD_CHANNEL_INTO_GROUP(state, channel) {
            state.listGroup.find(e => e.id == channel.channelGroupId).listChannel.push(channel);
        },
        REMOVE_CHANNEL(state,channel){
            const listChannel  = state.listGroup.find(e => e.id == channel.channelGroupId).listChannel;
            listChannel.splice(
                listChannel.findIndex(e => e.id == channel.id),
                1
            );
        },
        MODIFY_CHANNEL(state,channel){
            const channelinList  = state.listGroup
                .find(e => e.id == channel.channelGroupId)
                .listChannel
                .find(e => e.id == channel.id);
                
            channelinList.name = channel.name;
            channelinList.description = channel.description;
        },
        SET_VISIBILITY(state, visibility){
            state.visible = visibility;
        },

    },

    actions: {
        async setListGroup(context) {
            try {
                context.commit("SET_LIST_GROUP", await HTTPRequest.get("channel/byGroup"));
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },
        async createChannel(context, channel) {
            try {
                context.commit("ADD_CHANNEL_INTO_GROUP", {
                    ...channel,
                    id: (await HTTPRequest.post("channel/", channel)).insertId,                        
                });
            } catch (error) {
                context.dispatch("errorModule/setError", error, { root: true });
            }
        },
        switchVisibility({commit, state}){
            commit('SET_VISIBILITY', !state.visible)
        }
    },
};
