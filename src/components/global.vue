<script>
import store from '../store'
const serverSrc='www.baidu.com';
const hasEnter=false;
const userSite="中国钓鱼岛";
const token = store.getters.token
export default{
  userSite,//用户地址
  token,//用户token身份
  serverSrc,//服务器地址
  hasEnter,//用户登录状态
}
</script>