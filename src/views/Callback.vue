<template>

</template>

<script>
  import {  getApiWxLogin } from '../api';
  export default {
    data() {
      return {
        logining: false,
        checked: true
      };
    },
    methods: {
  
    },
    mounted() {
        var code = this.$route.query.code;
        if(code != ""){
            const loading = this.$loading({
              lock: true,
              text: '正在登陆中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });  
            var param = {
              'code': code
            }            
            getApiWxLogin(param).then((res) => {
              loading.close();
              if(res.data.code == 0){
                 this.$message({message: '恭喜，登陆成功。',type: 'success'});
                 this.$store.commit('SET_USER',res.data.result.data)
                 this.$store.commit('SET_TOKEN',res.data.result.data.token)
                 this.$store.commit('SET_ISLOGIN',true)
                 sessionStorage.setItem('user', JSON.stringify(res.data.result.data));
                 sessionStorage.setItem('token', res.data.result.data.token);
                 sessionStorage.setItem('isLogin', true);
                 this.$router.push({ path: '/' });                   
              }else{
                 this.$message.error(res.data.msg);
              }
            });                
        }
    }
  }
// http://localhost:8080/#/apilogin?key=YTo0OntzOjM6InVpZCI7aTozMDA7czo2OiJvcGVuaWQiO3M6Mjg6Im9rcUgwNWN2eUw3dm5JVlFyTFYyQm9aaC1yTm8iO3M6NDoidGltZSI7aToxNTI1ODU0NzI1O3M6Mzoia2V5IjtzOjMyOiI2MjEzMWRmZmU2ODVhZTY5ZjM1YzI4Njc3MmJhNTMwYyI7fQ%3D%3D
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>