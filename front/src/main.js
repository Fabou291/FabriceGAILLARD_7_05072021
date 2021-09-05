import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import JWT from "jsonwebtoken";

import "@/sass/main.scss";

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const accessToken = window.localStorage.getItem('accessToken');
        if(accessToken == null) return next('/login');

        const { userId } = JWT.decode(accessToken);
     
        
        if(store.state.userModule.user.id == null) await store.dispatch('userModule/getById', userId ,{root : true})
        else return next();
    }
    return next();
});

router.afterEach((to) => {
    const title = to.meta.getTitle ? to.meta.getTitle(to) : to.meta.title;
    document.title = title ;
    document.description = to.meta.description ;
});


createApp(App).use(store).use(router).mount('#app')
