<template>
    <section class="contetn_container">
        <div class="head_bar">SVIP详情 <i class="fa fa-reply" @click="goback"></i></div>
        <div class="content">
            <el-row>
                <el-col :span="24">
                    <div class="grid-title">
                        <div class="title">数据概况
                            <el-tooltip class="item" effect="dark" content="数据概况" placement="right">
                                <i class="fa fa-question-circle"></i>
                            </el-tooltip>
                            <p>注：分佣客户、直接客户、下级VIP、下级SVIP数据不支持按时间刷新</p>
                            
                            <div class="tools_bar">
                                <el-button class="fa fa-refresh" @click="refreshBtn"></el-button>
                                <el-date-picker
                                v-model="monthSelect"
                                type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="el-row-border">
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark" placement="Top center">
                        <div slot="content">所有参与分佣的客户总数，包含SVIP的直接客户<br/>所厲一级VIP和SVIP发展的一级客户和VIP</div>
                        <span>分佣客户<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">SVIP自己发展的客户总数，<br/>不包含其下级VIP和SVIP发展的一级客户</div>
                        <span>直接客户<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark" placement="Top">
                        <div slot="content">包含SVIP的直接发展的VIP，<br/>所属一级SVIP和VIP发展的一级VIP</div>                        
                        <span>下级VIP<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark" content="仅包含SVIP的直接发展的SVIP" placement="right">
                        <span>下级SVIP<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark"placement="right">
                        <div slot="content">包含SVIP的直接发展的SVIP，<br/>所属一级VIP和SVIP直接发展的SVIP所获得的推荐收入总额</div>                                                
                        <span>推荐收入<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
            </el-row>
            <el-row class="el-row-border">
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">SVIP从自己分佣客户的商品订单中获得的所有收入,<br/>以订单交易完成且平台完成分账计入，</br>已扣除退款订单中返还的收入</div>                                                                        
                        <span>商品佣金入账收入<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
                <div>
                    <p>0</p>
                    <el-tooltip class="item" placement="right">
                        <div slot="content">SVIP的分佣客户下的所有商品订单中，<br/>以订单支付完成计入</div>  
                        <span>商品支付订单<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">SVIP的分佣客户下的所有商品订单总金额，<br/>以订单支付完成计入，不见去退款成功的金额</div> 
                        <span>商品支付金额<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">SVIP的分佣客户下的所有商品订单中，<br/>以订单交易完成且平台完成分账计入</div> 
                        <span>商品成交单数<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
                <div>
                    <p>0</p>
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">SVIP的分佣客户下的所有商品订单总金额，<br/>以订单交易完成且平台完成分账计入，</br>已减去退款成功的金额</div>                         
                        <span>商品成交金额<i class="fa fa-question-circle"></i></span>
                    </el-tooltip>
                </div>
            </el-row>
        </div>
        <div class="content">
            <el-row>
                <el-col :span="24">
                    <div class="grid-title">
                        <div class="title">账号信息</div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="el-row-border" style="padding:20px">
                <table cellspacing="0" class="el-row-table">
                    <tr>
                        <td rowspan="3">用户头像</td>
                        <td class="alter">手机号</td>
                        <td>13800138000</td>
                        <td class="alter">昵称</td>
                        <td>小黄鸡</td>
                        <td class="alter">账号状态</td>
                        <td>正常</td>
                    </tr>
                    <tr>
                        <td class="alter">SVIP ID</td>
                        <td>123466</td>
                        <td class="alter">SVIP所属</td>
                        <td>渠道：ZANDY</td>
                        <td class="alter">上级</td>
                        <td>SVIP:四海一家</td>
                    </tr>
                    <tr>
                        <td class="alter">加入时间 <i class="fa fa-question"></i></td>
                        <td>2018-01-10 11:11:11</td>
                        <td class="alter">姓名</td>
                        <td>曾荣智</td>
                        <td class="alter">更新时间<i class="fa fa-question"></i></td>
                        <td>无</td>
                    </tr>
                </table>
            </el-row>
        </div>
        <div class="content">
            <el-row>
                <el-col :span="24">
                    <div class="grid-title">
                        <div class="title">账户信息</div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="el-row-border info_border">
               <div>待确认金额</div>
               <div>0.00</div>
               <div>账户余额</div>
               <div>0.00</div>
               <div>提现中</div>
               <div>0.00</div>
               <div>已提现</div>
               <div>0.00</div>
               <div>累计收入</div>
               <div>0.00</div>
            </el-row>
        </div>
    </section>
</template>

<script>
export default {
  name: "svipdetails",
  data() {
    return {
      monthSelect: ""
    };
  },
  methods: {
    refreshBtn(e) {
      console.log(e);
    },
    goback(e){
        this.$router.go(-1)
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.content {
  padding: 20px;
  .grid-title {
    line-height: 48px;
    background: #f8f8f8;
    position: relative;
    .title {
      padding-left: 10px;
      .fa {
        color: #8c939d;
      }
      .tools_bar {
        position: absolute;
        right: 0;
        height: 48px;
        top: 0;
      }
    }
    p {
      display: inline-block;
      margin: 0;
      color: #999999;
      padding-left: 20px;
    }
  }
}
.el-row-border {
  display: flex;
  justify-content: space-around;
  width: 100%;
  border: 1px solid #e7e7e7;
  .el-row-table{
    width: 100%;
    border:1px solid #e7e7e7; 
    color:#666; 
    td{
        text-align: left;
        font-weight: normal;
        border: 1px solid #e7e7e7;
        padding-left: 20px
    }
    tr{
        border:1px solid #e7e7e7; 
        line-height: 40px;
    }
    .alter{
        background: #f8f8f8
    }
  }
  div {
    flex: 1;
    border-right: 1px solid #e7e7e7;
    text-align: center;
    height: 60px;
    p {
      margin: 0;
      color: #717171;
      font-weight: 600;
      font-size: 22px;
      padding-top: 8px;
    }
    span {
      line-height: 20px;
      color: #868686;
      cursor: pointer;
      .fa{
          margin-left: 10px;
      }
    }
  }
}
.info_border{
    div{
        height: 40px;
        line-height: 40px;
        &:nth-child(2n){
            background: #f8f8f8
        }
    }
}
</style>