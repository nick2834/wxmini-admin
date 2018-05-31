<template>
  <section class="contetn_container">
    <div class="head_bar">财务详情 <i class="fa fa-reply" @click="goback"></i></div>
    <div class="content">
      <div class="war_box">
        当前订单状态：已付款，未收货，未到账
      </div>
      <div class="info_box">
        <div class="info_title"><span>订单信息</span></div>
        <el-row class="info_msg">
          <el-col :span="12">
            <div class="item">
              <div class="title">订单编号</div>
              <div class="value">1384561564612348741</div>
            </div>
            <div class="item">
              <div class="title">付款时间</div>
              <div class="value">2018-03-18 11:11:56</div>
            </div>
            <div class="item">
              <div class="title">实际收货时间</div>
              <div class="value">2018-03-18 11:11:56</div>
            </div>
            <div class="item">
              <div class="title">实际到账时间</div>
              <div class="value">2018-03-18 11:11:56</div>              
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <div class="title">所属业务</div>
              <div class="value">淘宝：十年老店</div>
            </div>
            <div class="item">
              <div class="title">付款时间</div>
              <div class="value">2018-03-18 11:11:56</div>
            </div>
            <div class="item">
              <div class="title">预计到账时间</div>
              <div class="value">2018-03-18 11:11:56</div>              
            </div>
          </el-col>
        </el-row>
        <div class="info_table">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="商品信息"
              width="180">
              <template slot-scope="scope">
                付款：{{scope.row.payment_time}}<br/>
                到帐：{{scope.row.distribute_time}}
              </template>	
            </el-table-column>
            <el-table-column
              prop="ID"
              label="商品ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="price"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="nums"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="付款金额">
            </el-table-column>
            <el-table-column
              prop="outerPrice"
              label="退款金额">
            </el-table-column>
            <el-table-column
              label="客户信息">
              <template slot-scope="scope">
                {{scope.row.info}}<br/>
                {{scope.row.phone}}
              </template>	
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="info_box">
        <div class="info_title"><span>分账信息</span></div>
        <div class="info_table">
          <el-table
            :data="msgData"
            style="width: 100%">
            <el-table-column
              prop="identity"
              label="身份"
              width="180">
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="inTime"
              label="到账时间">
            </el-table-column>
            <el-table-column
              prop="inner"
              label="收入">
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    
  </section>
</template>
<script>
export default {
  data () {
      return {
          tableData: [{
            img:'/',
            shopnames:'优质内部金刚轮',
            ID:'535484513',
            price:"￥27.54",
            nums:'6',
            totalPrice:"￥27.54",
            outerPrice:"￥0.00",
            info: 'ZAndy',
            phone: '13800138000'
          }],
          msgData:[{
            identity:'渠道',
            id:'9527',
            name:'张三',
            tel:'13800138000',
            inTime:'---',
            inner:'￥1.00',
            state:1
          },{
            identity:'渠道',
            id:'9527',
            name:'张三',
            tel:'13800138000',
            inTime:'---',
            inner:'￥1.00',
            state:1
          },{
            identity:'渠道',
            id:'9527',
            name:'张三',
            tel:'13800138000',
            inTime:'---',
            inner:'￥1.00',
            state:1
          }]
      }
  },
  methods: {
    goback(e){
      this.$router.go(-1)
    }
  },
  mounted () {
    
  }
}
</script>
<style lang="scss" scoped>
.content{
  padding: 20px;
  .war_box{
    padding: 20px;
    background: #fcf7e3;
    color: #a0885c;
    font-weight: 600;
    line-height: 35px
  }
  .info_box{
    margin-top: 20px;
    border: 1px solid #e7e7e7;
    min-height: 300px;
    .info_title{
      height: 40px;
      background: #f8f8f8;
      span{
        background: #fff;
        display: inline-block;
        line-height: 40px;
        padding: 0 20px;
        color: #747474;
        font-weight: 600
      }
    }
    .info_msg{
      padding: 20px 20px 0 20px;
      min-height: 150px;
      .el-col{
        height: inherit;
        .item{
          display: flex;
          justify-content: space-between;
          text-align: left;
          line-height: 50px;
          color: #747474;
          font-size: 14px;
          font-weight: 600;
          div{
            flex: 1
          }
          .title{
            text-align: right;
            margin-right: 20px
          }
        }
      }
    }
    .info_table{
      padding: 0 20px 20px;
    }
  }
  
}

</style>

