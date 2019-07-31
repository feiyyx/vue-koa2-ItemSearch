import { BaseURL } from '../config/api'

/**
 * get封装方法
 * @param {String} url 
 * @return {Object} response
 */
function _get(url) {
    return new Promise((resolve, reject) => {
        var XHR = new XMLHttpRequest();

        XHR.open('GET', BaseURL + url, true);//true->异步，false->非异步
        XHR.send();

        XHR.onreadystatechange = () => {
            if(XHR.readyState === 4) {
                if(XHR.status === 200) {
                    try {
                        var response = JSON.parse(XHR.responseText);
                        resolve(response)
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText + "链接失败"))
                }
            }
        }
    })
}

/**
 * post封装方法
 * @param {String} url 
 * @return {Object} response
 */
function _post(url, data={}) {
    return new Promise((resolve, reject) => {
        var XHR = new XMLHttpRequest();
        
        XHR.open('POST', BaseURL + url, true);
        XHR.withCredentials = true;//跨域获取资源
        XHR.setRequestHeader("Content-Type", "application/json");
        XHR.send(JSON.stringify(data));

        XHR.onreadystatechange = () => {
            if(XHR.readyState === 4) {
                if(XHR.status === 200) {
                    try {
                        var response = JSON.parse(XHR.responseText);
                        resolve(response)
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText + "链接失败"))
                }
            }
        }
    })
}

/**
 * formdata的post封装方法
 * @param {String} url 
 * @return {Object} response
 */
function _postFormdata(url, data) {
    if(!(data instanceof FormData)) {
        console("TYPE ERROR")
        return;
    }
    return new Promise((resolve, reject) => {
        var XHR = new XMLHttpRequest();
        
        XHR.open('POST', BaseURL + url, true);
        XHR.withCredentials = true;//跨域获取资源
        XHR.send(data);

        XHR.onreadystatechange = () => {
            if(XHR.readyState === 4) {
                if(XHR.status === 200) {
                    try {
                        var response = JSON.parse(XHR.responseText);
                        resolve(response)
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText + "链接失败"))
                }
            }
        }
    })
}

/**
 * 防抖函数封装方法
 * @param {Function} callback 
 * @param {Number} delayValue 短时间内多次触发同一个事件，只执行最后一次/最开始一次，这里是最后一次
 * @return {Function} 
 */
function _debounce(callback, delay=200) {
    var _timer = null
    return function(...args) {
        var _this = this;
        _timer && clearTimeout(_timer);
        _timer = setTimeout(() => {
            callback.apply(_this, args);
        }, delay);
    }
}

/**
 * 节流函数封装方法
 * @param {Function} callback 
 * @param {Number} delayValue 一段时间内只能发生一次
 * @return {Function}
 */
function _throttle(callback, delay=200) {
    var _timer = null;
    var _lastTime = null;

    return function(...args) {
        var _nowTime = +new Date();
        var _this = this;
        _timer && clearTimeout(_timer);

        if(!_lastTime || _lastTime - _nowTime > delay) {
            _timer = callback.apply(_this, args);
            _lastTime = _nowTime;
        } else {
            _timer = setTimeout(() => {
                callback.apply(_this, args);
            }, delay);
        }
    }
}

export { _get, _post, _postFormdata, _throttle, _debounce }