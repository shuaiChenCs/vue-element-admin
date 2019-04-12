import axios from 'axios';
import router from '../router/router';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://c.api.msspay.com/';

axios.defaults.headers.post['Content-Type'] = 'application/json';

//错误处理
axios.interceptors.response.use(function (response) {
    if (response.data.code === 401) {
        sessionStorage.setItem('isLogin', '')
        router.push({path: '/login'});
    }
    return response;
}, function (error) {
    console.log('error:', error)
});

//http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.errCode ==2){
            router.push({
                path:"/login",
                querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}