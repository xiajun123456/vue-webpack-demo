/**
 * Created by xiajun on 2017/9/14.
 */
const mutations = {
    ['INIT_USER'](state, type){
        state.user = type
    },
    ['SET_IS_LOGIN'](state, type){
        state.isLogin = type
    },
    ['SET_PATH'](state, path){
        state.path = path
    }
};
export  default  mutations;