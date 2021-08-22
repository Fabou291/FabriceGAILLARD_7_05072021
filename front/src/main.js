import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import JWT from "jsonwebtoken";

import '@/sass/base/_reset.scss';
import '@/sass/base/_typography.scss';
import '@/sass/base/_base.scss';
import '@/sass/layout/_sidebar.scss';
import '@/sass/layout/_left-side.scss';
import '@/sass/layout/_right-side.scss';
import '@/sass/layout/_sidebar.scss';
import '@/sass/layout/_main.scss';
import '@/sass/components/_input-default.scss';

import "@/js/modal.js";



router.beforeEach(async (to, from, next) => {


    if (to.matched.some(record => record.meta.requiresAuth)) {
        const accessToken = window.localStorage.getItem('accessToken');
        if(accessToken == null) return next('/login');

        const { userId } = JWT.decode(accessToken);
     
        
        if(store.state.userModule.id == null) await store.dispatch('userModule/getById', userId ,{root : true})
        else return next();
    }
    return next();
    
})


createApp(App).use(store).use(router).mount('#app')
