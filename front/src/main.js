import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/sass/base/_reset.scss';
import '@/sass/base/_typography.scss';
import '@/sass/base/_base.scss';
import '@/sass/layout/_container.scss';
import '@/sass/layout/_main.scss';
import '@/sass/layout/_sidebar.scss';


router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const accessToken = window.localStorage.getItem('accessToken');
        if(accessToken == null) next('/login');
        
        if(store.state.userModule.id == null){
            const response = await store.dispatch('userModule/getById', {accessToken} ,{root : true})
            if(!response){
                //Refresh le token plutot que de rediriger
                next('/login');
            }
        }
        next();
    }
    next();
})


createApp(App).use(store).use(router).mount('#app')
