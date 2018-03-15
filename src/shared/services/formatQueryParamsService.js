'use strict';
import moment from 'moment';
var format = (queryParams, pageIndex, pageSize) =>{
    var params = {};
    var addressParams = ['city', 'province', 'area'],
        timeParams = ['startTime', 'endTime','startDate','monthlyEnd','monthlyStart','times'],
        billParams = ['useRechargeBill', 'useFreeBill', 'useConsumBill'];
    for (var prop in queryParams) {
        var key = prop;
        if (queryParams.hasOwnProperty(prop) && (!!queryParams[prop] || queryParams[prop] == '0')) {
            if(_.isString(queryParams[prop])){
                params[key] = queryParams[prop];
            }
        }
        var val = queryParams[key];
        if (val && prop == 'area') {
           for (var key1 in val){
               params[key1] = val[key1].id;
           }
        } else if (val && timeParams.indexOf(key) != -1) {
            if (prop == 'startTime' || prop == 'endTime'||prop == 'startDate'||prop == 'monthlyStart'||prop == 'monthlyEnd'||prop == 'times') {
                val = moment(val).format("YYYY-MM-DD")
            }
            params[key] = val;
        } else if (billParams.indexOf(key) != -1 && !val) {
            delete params[key];
        }
    }
    if (pageIndex || pageSize ) {
        params.currentPage = pageIndex;
        params.itemsPerPage = pageSize;
    }
    return params;
};
export  default  {
    format:format
}