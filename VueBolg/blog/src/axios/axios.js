
// 配置API接口地址
// var localhost = 'http://127.0.0.1:8000/'       //测试地址
var localhost = 'http://123.207.108.221/'     //本地

// 引用axios
var axios = require('axios')

//axios封装方法
function apiAxios (method, url, params, success, failure) {

    axios({
        method: method,
        url: url,
        data: (method === 'POST' || method === 'PUT') ? params : null,
        params: (method === 'GET' || method === 'DELETE') ? params : null,
        baseURL: localhost,
        headers:{
            // Authorization:ourToken
            // Content-Type: 'application/json;charset=UTF-8;multipart/form-data;application/x-www-form-urlencoded;'
        },
        withCredentials: false
    })
    .then(function (res) {

        if (res.status >= 200 && res.status < 300) {

            success(res.data); 
        } else {
            
            failure(res.data);
        }
    })
    .catch(function (err) {

        failure(err.response);
    });
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}