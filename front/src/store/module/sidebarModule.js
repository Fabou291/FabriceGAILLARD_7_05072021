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
        ADD_CHANNEL_INTO_GROUP(state, data) {
            state.listGroup[data.groupIndex].push(data.channel);
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
        async addChannel(state, channel){
            try {
                state.commit("ADD_CHANNEL_INTO_GROUP", await HTTPRequest.post("channel/", channel));
            } catch (error) {
                console.log(error);
            }
        },
        async modifyChannel(state,channel){
            try {
                state.commit("MODIFY_CHANNEL", await HTTPRequest.put(`channel/${channel.id}`,channel));
            } catch (error) {
                console.log(error);
            }
        },
        async removeChannel(state,channel){
            try {
                state.commit("REMOVE_CHANNEL", await HTTPRequest.delete(`channel/${channel.id}`));
            } catch (error) {
                console.log(error);
            }
        },
    },
};
