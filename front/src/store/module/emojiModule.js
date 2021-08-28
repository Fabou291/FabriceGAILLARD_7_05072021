const emojisData = require("@/assets/twemoji/datas/listEmojiByGroup.json");

const emojisShortCodeIndex = emojisData => {
    let emojisShortCodeIndex = new Map();
    
    Object.values(emojisData).forEach(emojiGroup => {
        emojiGroup.emojis.forEach(emoji => { 
            if(emoji.sc) emojisShortCodeIndex.set(emoji.sc, emoji)
        })
    });

    return emojisShortCodeIndex;
}



export default {
    namespaced: true,
    state: {
        skin: "A",
        emojisData : emojisData,
        indexesColor: require("@/assets/twemoji/datas/indexesSkin.json"),
        emojisDataIndexed : Object.values(emojisData).reduce((a,e) => a.concat(e.emojis),[]),
        emojisShortCodeIndex : emojisShortCodeIndex(emojisData),
        skinColors : ['A','B','C','D','E','F'],
        unicodeSkin : {
            'A' : require("@/assets/twemoji/datas/A.json"),
            'B' : require("@/assets/twemoji/datas/B.json"),
            'C' : require("@/assets/twemoji/datas/C.json"),
            'D' : require("@/assets/twemoji/datas/D.json"),
            'E' : require("@/assets/twemoji/datas/E.json"),
            'F' : require("@/assets/twemoji/datas/F.json"),
        },
        display : {
            x : 0,
            y : 0,
            width : 0,
            height : 0,
            visible : false,
            handlerDivEditable : null
        }
    },
    mutations : {
        CLOSE(state){
            state.visible = false;
            state.activeGroupChannel = { id : null, name : null };
        },
        OPEN(state, activeGroupChannel){
            state.activeGroupChannel = activeGroupChannel;
            state.visible = true;
        },
        CHANGE_SKIN(state, index){
            state.skin = state.skinColors[index];
        },
        SET_EMOJIS_DATA_INDEXED(emojisDataIndexed){
            this.emojisDataIndexed = emojisDataIndexed; 
        },
        SET_POSITION(state, payload){
            state.display.x = payload.x;
            state.display.y = payload.y;
        },
        SET_SIZE(state, payload){
            state.display.width = payload.width;
            state.display.height = payload.height;
        },
        SET_VISIBILITY(state, visibility){
            state.display.visible = visibility;
        },
        SET_HANDLER_DIV_EDITABLE(state, handlerDivEditable){
            state.display.handlerDivEditable = handlerDivEditable;
        },
    },
    actions : {
        changeSkin({commit, dispatch}, index){
            commit('CHANGE_SKIN',index);
            dispatch('updateEmojisDataIndexedBySkin', index)
        },
        updateEmojisDataIndexedBySkin({commit, state}, index){
            let j = 0;
            let emojisDataIndexed = JSON.parse(JSON.stringify(state.emojisDataIndexed));
            
            const color = state.skinColors[index];

            for (const i of state.indexesColor)
                emojisDataIndexed[i].u = state.unicodeSkin[color][j++];

            commit('SET_EMOJIS_DATA_INDEXED',emojisDataIndexed); 
        },
    }
};