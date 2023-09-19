/**
 * ajax请求配置
 */
import axios from 'axios'


// axios默认配置
axios.defaults.timeout = 10 * 60000;   // 超时时间  1分钟
axios.defaults.baseURL = 'http://localhost:8080/edu-platform/background';   // 默认地址

//整理数据
axios.defaults.transformRequest = function (data) {
    return JSON.stringify(data);
};

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
    config => {
        // eslint-disable-next-line no-prototype-builtins
        if (!config.headers.hasOwnProperty('Content-Type')) {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            config.headers['token'] = sessionStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error.response);
    });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
    response => {
        let code = response.data.code;
        if (code != undefined && code == 50014) {
            location.href = '/login';
        } else {
            return response.data
        }
    },
    error => {
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });



export default axios
