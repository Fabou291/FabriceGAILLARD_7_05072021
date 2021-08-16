import { createStore } from 'vuex'

import userModule from "./module/userModule.js";
import errorModule from "./module/errorModule.js";
import createChannelDisplay from "./module/createChannelDisplay.js";
import sidebarModule from "./module/sidebarModule.js";
import postModule from "./module/postModule.js";
import configChannelModule from "./module/configChannelModule.js";

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

  },
  getters:{
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userModule,
    errorModule,
    createChannelDisplay,
    sidebarModule,
    postModule,
    configChannelModule
  }
})
