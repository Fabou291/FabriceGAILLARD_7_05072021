import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/sass/base/_reset.scss';
import '@/sass/base/_typography.scss';
import '@/sass/base/_base.scss';
import '@/sass/layout/_container.scss';
import '@/sass/layout/_main.scss';
import '@/sass/layout/_sidebar.scss';

createApp(App).use(store).use(router).mount('#app')
