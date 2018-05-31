import { getFormatDateObj } from '../utils/diyCommon'
import moment from 'moment';
import _ from "lodash"

// 引擎返回的时间格式
export const compareDate = (date1, date2) => {
    if (getFormatDateObj(date1) - getFormatDateObj(date2) >= 0) {
        return true;
    } else {
        return false;
    }
}
// YYYY-MM-DD格式的
export const compareFormatDate = (date1, date2) => {
    date1 = moment(date1).valueOf();
    date2 = moment(date2).valueOf();
    if(date1 > date2) {
        return true;
    } else {
        return false;
    }
}
// 获取到指定父节点
export const getTargetNode = (node, nodeName) => {
    if (node.nodeName.toLowerCase() == nodeName) {
        return node;
    }
    while (node) {
        node = node.parentNode;
        if (node.nodeName.toLowerCase() == nodeName) {
            break;
        }
    }
    return node;
}
//获取目标dom
export const getTargetByClass = (node, className) => {
    if (node.className.toLowerCase() == className) {
        return node;
    }
    while (node) {
        node = node.parentNode;
        if (node.className.toLowerCase() == className) {
            break;
        }
    }
    return node;
}

//获取dom的offsetTop
export const getElementViewTop = (element, parentElement = document.body) => {
    if(!element) {
        return 0;
    }
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null && current!==parentElement) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
export const getBodyScrollTop = () => {
    let scrollTop = (document.body && document.body.scrollTop) || (document.documentElement && document.documentElement.scrollTop)
    return scrollTop
}
export const queryFirstByName = (name) => {
    return document.getElementsByName(name) && document.getElementsByName(name)[0]
}
export const queryFirstByClass = (className) => {
    return document.getElementsByClassName(className) && document.getElementsByClassName(className)[0]
}
// 专门为对象写的filter函数，数组请用_.filter或者Array.filter
export const filter = (obj, callback) => {
    let newObj = {};
    _.each(obj, (value, key) => {
        let result = callback(value, key);
        if(result) {
            newObj[key] = result
        }
    })
    return newObj
}
// 取对象中第一个属性
export const first = (obj) => {
    const firstKey = _.keys(obj) && _.keys(obj)[0];
    return obj[firstKey]
}
export const last = (obj) => {
    const size = _.size(obj);
    const lastKey = _.keys(obj) && _.keys(obj)[size-1];
    return obj[lastKey]
}
export const setBodyScrollTop = (scrollTop) => {
    window.scrollTo(0, scrollTop);
}
// 对比两个obj中的项是不是ItemID都一一对应
// 比如selected1 = {1111: {}, 2222: {}}, selected2 = {2222: {}, 1111: {}}，这样就相等
export const compareSelected = (selected1 = {}, selected2 = {}) => {
    let isEqual = true
    // 如果属性数量不相等
    if(_.size(selected1)!==_.size(selected2)) {
        return isEqual = false
    }
    _.each(selected1, (s1, id1) => {
        if(_.isEmpty(selected2[id1])) {
            isEqual = false
        }
    })
    return isEqual
}
// 将YYYY-MM-DD的格式转为毫秒
export const getValueOfDate = (date) => {
    return moment(date).valueOf();
}