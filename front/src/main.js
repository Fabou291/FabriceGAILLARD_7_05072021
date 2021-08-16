import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/sass/base/_reset.scss';
import '@/sass/base/_typography.scss';
import '@/sass/base/_base.scss';
import '@/sass/layout/_sidebar.scss';
import '@/sass/layout/_left-side.scss';
import '@/sass/layout/_right-side.scss';
import '@/sass/layout/_sidebar.scss';
import '@/sass/layout/_main.scss';
import '@/sass/components/_input-default.scss';



router.beforeEach(async (to, from, next) => {


    if (to.matched.some(record => record.meta.requiresAuth)) {
        const accessToken = window.localStorage.getItem('accessToken');
        if(accessToken == null) return next('/login');
        
        if(store.state.userModule.id == null){
            const user = await store.dispatch('userModule/getById', {accessToken} ,{root : true})
            if(!user){
                const accessTokenRefresh = await store.dispatch('userModule/refreshToken', {accessToken} ,{root : true})
                if(!accessTokenRefresh) return next('/login');
                
                window.localStorage.setItem('accessToken',accessTokenRefresh.accessToken)
            }
        }
        return next();
    }
    return next();
})


createApp(App).use(store).use(router).mount('#app')
