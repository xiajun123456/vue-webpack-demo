import Vue from 'Vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions'

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{

    }
});