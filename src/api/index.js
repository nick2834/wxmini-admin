import axios from 'axios';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        config.params['token'] = user.token;
    }   
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.status == 200 && response.data.code == 10001) {
        sessionStorage.removeItem('user');
        window.location.href = "/#/login";
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export const requestLogin = params => { return axios.post(process.env.API_HOST + `login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(process.env.API_HOST + `user/list`, { params: params }); };

//首页数据概览
export const getHomeData = params => { return axios.get(process.env.API_HOST + `agent/Users`, { params: params }).then(res =>res.data); };

//加载Svip列表
export const getUserSvipListPage = params => { return axios.get(process.env.API_HOST + `agent/Svip/Lists`, { params: params }); };

//加载Svip列表
export const getSvipOrdersPage = params => { return axios.get(process.env.API_HOST + `agent/Svip/orders`, { params: params }); };

//加载客户列表
export const getUserListPage = params => { return axios.get(process.env.API_HOST + `agent/users/lists`, { params: params }); };

//我的帐户
export const getUserAccount = params => { return axios.get(process.env.API_HOST + `agent/users/account`, { params: params }); };

//申请提现
export const getApply = (data) => {
    return axios.post(process.env.API_HOST + 'api/withdrawals/extract', data).then(res =>res.data)
}

//提现记录
export const getwithdrawList = params => { return axios.get(process.env.API_HOST + `agent/withdraw/lists`, { params: params }); };

//财务明细
export const getOrdersList = params => { return axios.get(process.env.API_HOST + `agent/orders/lists`, { params: params }); };

//API越权登陆
export const getApiLogin = params => { return axios.get(process.env.API_HOST + `agent/login/adminlogin`, { params: params }); };

//API微信扫码登陆
export const getApiWxLogin = params => { return axios.get(process.env.API_HOST + `agent/login/wxlogin`, { params: params }); };