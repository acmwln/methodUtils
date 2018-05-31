import _ from 'lodash'
import moment from 'moment'
/*
只转化引擎返回的date类型
将将对象转化成TimeSpan
返回结果：
合法   返回Number
不合法 返回null
*/
export const getResTime = obj => {
    let temp = null;
    if (_.isString(obj)) {
        if (new RegExp("^/Date[(][-]?[0-9]+[+-]?[0-9]{4}[)]/$").test(obj)) {
            temp = Number(obj.match(/[-]?\d+/g)[0]);
        }
    }
    return temp
};

export const getResUtcMoment = (date)=>{
    const timespan = getResTime(date);
    return timespan?moment.utc(timespan):null
}
//转换引擎返回的时间
export const getFormatDateObj = (date) => {
    const timeSpan = getResTime(date);
    //日期类型不合法
    if (_.isNull(timeSpan)) {
        return null;
    }
    let dateObj = new Date(timeSpan + 8 * 3600 * 1000);
    let year = dateObj.getUTCFullYear();
    let month = dateObj.getUTCMonth();
    let day = dateObj.getUTCDate();
    let hour = dateObj.getUTCHours();
    let minute = dateObj.getUTCMinutes();
    let second = dateObj.getUTCSeconds();

    return new Date(year, month, day, hour, minute, second);
};

export const getResFormatYMD = (data)=>{
    return moment(getFormatDateObj(data)).format('YYYY-MM-DD')
}


/**
 * 加法函数，用来得到精确的加法结果
 * javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * return number
 **/
export const add = (arg1, arg2)=>{
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}
/**
 * 乘法函数，用来得到精确的乘法结果
 * javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * return number
 **/
export const multiply=(arg1, arg2)=> {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) { console.log(e);}
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) { console.log(e);}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
// 计算两个日期之间的月份数，包括time1和time2所在的两个月（日期格式为YYYY-MM-DD）
export const getMonthDiff = (time1, time2) => {
    if(moment(time1).valueOf() < moment(time2).valueOf()) {
        [time1, time2] = [time2, time1];
    }
    const dateArr1 = time1.split("-"),
        year1 = +dateArr1[0],
        month1 = +dateArr1[1];
    const dateArr2 = time2.split("-"),
        year2 = +dateArr2[0],
        month2 = +dateArr2[1];
    const monthCount = Math.abs((year1-year2) * 12 + month1 - month2 + 1)
    return monthCount
}

export const isUrl = (url)=> {
    return /^http(s)?:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/.test(url);
}

export const getFromFullUrl = (url,origin)=>{
    if(isUrl(url)){
        return url
    }else if(url.toLowerCase().indexOf("/webapp/") === 0){
        return origin+url
    }
    return false
}
