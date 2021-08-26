import HTTPRequest from "@/js/HTTPRequest/HTTPRequest.js";

export default {
    namespaced: true,
    state: {
        listGroup: null,
        visible : false
    },
    getters : {
        getChannelById: state => id => {
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
            const listChannel  = state.listGroup.find(e => e.id == channel.channelGroupId).listChannel;
            listChannel[listChannel.findIndex(e => e.id == channel.id)] = channel;
        },
        SET_VISIBILITY(state, visibility){
            state.visible = visibility;
        },

    },

    actions: {
        async setListGroup(state) {
            try {
                state.commit("SET_LIST_GROUP", await HTTPRequest.get("channel/byGroup"));
            } catch (error) {
                console.log(error);
            }
        },
        async createChannel(state, channel) {
            try {
                state.commit("ADD_CHANNEL_INTO_GROUP", {
                    ...channel,
                    id: (await HTTPRequest.post("channel/", channel)).insertId,                        
                });
            } catch (error) {
                console.log(error);
            }
        },
        switchVisibility({commit, state}){
            commit('SET_VISIBILITY', !state.visible)
        }
    },
};
