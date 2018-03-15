/**
 * Created by xiajun on 2017/9/14.
 */
const getters = {
    getIsLogin:state=>{
        return state.isLogin;
    },
    getUser:state => {
        return state.user;
    }
};
export default getters;