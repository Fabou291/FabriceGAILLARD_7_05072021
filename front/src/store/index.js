import { createStore } from 'vuex'

import userModule from "./module/userModule.js";
import errorModule from "./module/errorModule.js";
import flashCardModule from "./module/flashCardModule.js";
import createChannelDisplay from "./module/createChannelDisplay.js";
import sidebarModule from "./module/sidebarModule.js";
import postModule from "./module/postModule.js";
import configChannelModule from "./module/configChannelModule.js";
import imagePostModule from "./module/imagePostModule.js";
import inputPostChannelModule from "./module/inputPostChannelModule.js";
import emojiModule from "./module/emojiModule.js";


export default createStore({
  state: {
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
    configChannelModule,
    imagePostModule,
    inputPostChannelModule,
    emojiModule,
    flashCardModule
  }
})
