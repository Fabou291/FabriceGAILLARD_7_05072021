import { createStore } from 'vuex'

const emojisData = require("@/assets/twemoji/datas/listEmojiByGroup.json");
const emojisDataIndexed = function(){
  let emojisDataIndexed = [];
  for (const key in emojisData) emojisDataIndexed = emojisDataIndexed.concat(emojisData[key].emojis);
  return emojisDataIndexed;
}
const emojisShortCodeIndex = function(){
  let emojisShortCodeIndex = {};
  for (const key in emojisData){
    for(const emoji of emojisData[key].emojis){
      if(emoji.sc != null) emojisShortCodeIndex[emoji.sc] = emoji
    }
  }
  return emojisShortCodeIndex;
}

export default createStore({
  state: {
    user : {
      id : '0',
      pseudo : 'Fab',
      avatar : require("@/assets/imageProfil.png"),
      role : 'admin'
    },
    panelCreateChan : {
      component : null,
      visible : false
    },
    emoji : {
      skin: "A",
      emojisData : emojisData,
      indexesColor: require("@/assets/twemoji/datas/indexesSkin.json"),
      emojisDataIndexed : emojisDataIndexed(),
      emojisShortCodeIndex : emojisShortCodeIndex(),
      unicodeSkin : {
          'A' : require("@/assets/twemoji/datas/A.json"),
          'B' : require("@/assets/twemoji/datas/B.json"),
          'C' : require("@/assets/twemoji/datas/C.json"),
          'D' : require("@/assets/twemoji/datas/D.json"),
          'E' : require("@/assets/twemoji/datas/E.json"),
          'F' : require("@/assets/twemoji/datas/F.json"),
      }
    },
    actualPostInModifyMode : null,
  },
  getters:{
  },
  mutations: {
    UPDATE_ACTUAL_POST_IN_MODIFY_MODE(state){
      state.actualPostInModifyMode = 'A';

    }
  },
  actions: {
    updateActualPostInModifyMode(context){
      context.commit('UPDATE_ACTUAL_POST_IN_MODIFY_MODE');
     
    }
  },
  modules: {
  }
})
