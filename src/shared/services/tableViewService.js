/**
 * Created by xiajun on 2017/5/12.
 */
import _ from 'lodash';
var transformToRowData = (list, tableMapper,vue) => {
    var areaList = {
        province:true,
        city:true,
        area:true
    };
    var stateList = {
        userType:true,
        workStatus:true,
        brakeStatus:true,
        deviceProperty:true
    };
    return _.map(list, (item, idx) => {
        var rowData = {
            raw: item,
            data: _.map(tableMapper, (transform, key) => {
                if (_.isString(transform)) {
                    if(areaList[transform]){
                        if(item.area[transform]){
                            return{val: item.area[transform].name, key: key}
                        }else{
                            return{val: '所有', key: key}
                        }
                    }
                    return { val: item[transform], key: key};
                } else if (_.isFunction(transform)) {
                    var result = transform(item,vue);
                    if (result && result.controls) {
                        if(_.isArray(result.controls)){
                            return {arrays: result.controls, key: key };
                        }
                        return { val: item[result.controls.prop], controls: result.controls, key: key };
                    }
                    return { val: transform(item), key: key };
                }
            })
        };
        return rowData;
    });
};
export  default {
    transformToRowData:transformToRowData
}