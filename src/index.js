/**
 * Created by xiajun on 2017/4/5.
 */
import Vue from 'Vue';
import App from './app.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
import './style/reset.scss';

import Router from 'vue-router';
import store from './store'
import storage from  './shared/services/storageService.js';
import routes from './router';
import VueForm from 'vue-form';
import 'babel-polyfill';


Vue.config.debug = true;

Vue.use(ElementUI);
Vue.use(Router);
Vue.use(VueForm);

const router = new Router({
    routes
});
router.beforeEach((to, from, next) => {
    let user = storage.get('user');
    store.commit('SET_IS_LOGIN',false);
    store.commit('SET_PATH',to.path);
    if(to.path == '/login'){
        if(user){
            next({ path: '/map' });
        }else{
            store.commit('SET_IS_LOGIN',true);
        }
    }else{
        if (!user) {
            next({ path: '/login' });
            store.commit('SET_IS_LOGIN',true);
        }
    }
    next();
});

export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');