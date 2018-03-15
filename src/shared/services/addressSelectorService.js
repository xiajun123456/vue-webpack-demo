/**
 * Created by xiajun on 2017/11/14.
 */
export const loopData = (list, id) => {
    let active = {};
    list.forEach((val, key) => {
        if (val.id == id) {
            active = val;
            return
        }
    });
    return active;
};
export const loadDistrict = (list, id) => {
    let active = '';
    list.forEach((val, key) => {
        if (val.id == id) {
            active = val.id;
            return
        }
    });
    return active;
};