import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //设置状态
    state:{
        userInfo:{},
        token: '',
        isLogin: false
    },
    getters:{
        //获取属性的状态
        token: state => state.token = sessionStorage.getItem('token'),
        userInfo: state => state.userInfo = JSON.parse(sessionStorage.getItem('user')),
        isLogin: state => state.isLogin = sessionStorage.getItem('isLogin')
    },
    mutations:{
        //改变属性的状态
        SET_USER:(state, data) =>{
            state.userInfo = data
            sessionStorage.setItem("user", data)
        },
        //设置token
        SET_TOKEN:(state, data) => {
            state.token = data
            sessionStorage.setItem("token", data);  //添加到sessionStorage
        },
        SET_LOGOUT:(state,data) =>{
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("user")
            sessionStorage.setItem("isLogin",false)
        },
        SET_ISLOGIN:(state,data) =>{
            state.isLogin = data
        }
    },
    actions:{
        //应用mutations
    }
})
export default store