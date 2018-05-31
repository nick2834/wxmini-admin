import Vue from 'vue'
import Router  from 'vue-router'
Vue.use(Router )
import Login from 'views/Login.vue'
import NotFound from 'views/404.vue'
import Home from 'views/Home.vue'
import Main from 'views/main/index.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {path: '/', redirect: '/main',hidden:true},
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '数据概况' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-diamond',
        leaf: true,//只有一个节点
        children: [
            { path: '/svip', component: resolve => require(['views/svip/List.vue'], resolve), name: 'SVIP管理' },
            { path: '/svip/:id', component: resolve => require(['views/svip/svipdetails.vue'], resolve), name: 'SVIP详情',hidden:true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/list', component: resolve => require(['views/account/List.vue'], resolve), name: '客户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user',
        leaf: true,//只有一个节点
        children: [
            { path: '/account', component: resolve => require(['views/account/Account.vue'], resolve), name: '我的帐户' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-database',
        leaf: true,//只有一个节点
        children: [
            { path: '/orders', component: resolve => require(['views/orders/List.vue'], resolve), name: '财务明细' },
            { path: '/orders/:id', component: resolve => require(['views/orders/orderDetails.vue'], resolve), name: '财务详情',hidden:true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/withdraw', component: resolve => require(['views/withdraw/List.vue'], resolve), name: '提现记录' }
        ]
    }, 
    {
        path: '/apilogin',
        name: '越权登陆',
        hidden: true,
        component: resolve => require(['views/ApiLogin.vue'], resolve)
    },  
    {
        path: '/callback',
        name: '越权登陆',
        hidden: true,
        component: resolve => require(['views/Callback.vue'], resolve)
    },        
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];
const router = new Router ({
    routes
  })
export default  router;