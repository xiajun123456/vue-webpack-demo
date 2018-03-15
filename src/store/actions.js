/**
 * Created by xiajun on 2017/9/14.
 */
const actions = {
    async getPendingAlarmCount({commit, state}) {
        if (state.removeAddress.length > 0) return;
        let addres = await getPendingAlarmCount(state.userInfo.user_id);
        commit(SET_AlarmCount, addres);
    }
};
export default actions;