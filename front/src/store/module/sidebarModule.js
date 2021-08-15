import HTTPRequest from "@/js/HTTPRequest/HTTPRequest.js";

export default {
    namespaced: true,
    state: {
        listGroup: null,
    },

    mutations: {
        SET_LIST_GROUP(state, listGroup) {
            state.listGroup = listGroup;
        },
        ADD_CHANNEL_INTO_GROUP(state, channel) {
            console.log(channel)
            state.listGroup.find(e => e.id == channel.channelGroupId).listChannel.push(channel);
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
        async modifyChannel(state, channel) {
            try {
                state.commit("MODIFY_CHANNEL", await HTTPRequest.put(`channel/${channel.id}`, channel));
            } catch (error) {
                console.log(error);
            }
        },
        async removeChannel(state, channel) {
            try {
                state.commit("REMOVE_CHANNEL", await HTTPRequest.delete(`channel/${channel.id}`));
            } catch (error) {
                console.log(error);
            }
        },
    },
};
