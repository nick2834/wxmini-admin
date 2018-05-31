<template>

</template>

<script>
  import { getApiLogin } from '../api'
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
        var key = this.$route.query.key;
        if(key != ""){
            var param = {
              'key': key
            }
            const loading = this.$loading({
              lock: true,
              text: '正在登陆中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });            
            getApiLogin(param).then((res) => {
              loading.close();
              if(res.data.code == 0){
                 this.$message({message: '恭喜，登陆成功。',type: 'success'});
                 this.$store.commit('SET_USER',JSON.stringify(res.data.result.data))
                 this.$store.commit('SET_TOKEN',res.data.result.data.token)
                 this.$store.commit('SET_ISLOGIN',true)
                 sessionStorage.setItem('user', JSON.stringify(res.data.result.data));
                 sessionStorage.setItem('token', res.data.result.data.token);
                 sessionStorage.setItem('isLogin', true);
                 this.$router.push({ path: '/' });                   
              }else{
                 this.$message.error('抱歉，登陆失败！');
              }
            });                 
        }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
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