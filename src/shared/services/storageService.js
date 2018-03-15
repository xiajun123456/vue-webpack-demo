/**
 * Created by xiajun on 2017/5/10.
 */
import store from 'store'
export default {
    set(key,data){
        store.set(key,data);
    },
    get(key){
       return store.get(key)
    },
    remove(key){
        store.remove(key)
    }
}