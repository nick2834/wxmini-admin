<template>
    <section class="">
        <div class="head_bar">数据概况</div>
        <div class="route_container">
            <el-row>
                <el-col :span="24">
                    <div class="grid-title">
                        <div class="title">数据总览
                            <el-tooltip class="item" effect="dark" content="数据总览" placement="right">
                                <i class="fa fa-question-circle"></i>
                            </el-tooltip>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-row class="el-row-border">
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="left_circle cir_blue"><i class="fa fa-user-o"></i></div>
                        <div class="right">
                            <p>{{homeData.kehu}}</p>
                            <p>客户数</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="left_circle cir_org"><i class="fa fa-area-chart"></i></div>
                        <div class="right">
                            <p>{{homeData.vip}}</p>
                            <p>VIP数</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="left_circle cir_red"><i class="fa fa-copy"></i></div>
                        <div class="right">
                            <p>{{homeData.svip}}</p>
                            <p>SVIP数</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="left_circle"><i class="fa fa-yen"></i></div>
                        <div class="right">
                            <p>{{homeData.income}}</p>
                            <p>累计入账收入</p>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-row class="el-row-border">
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="left_circle"><i class="fa fa-yen"></i></div>
                        <div class="right">
                            <p>{{homeData.money}}</p>
                            <p>账户余额</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="left_circle"><i class="fa fa-yen"></i></div>
                        <div class="right">
                            <p>{{homeData.tixianzhong}}</p>
                            <p>提现中</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="left_circle"><i class="fa fa-yen"></i></div>
                        <div class="right">
                            <p>{{homeData.yitixian}}</p>
                            <p>已提现</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="left_circle"><i class="fa fa-yen"></i></div>
                        <div class="right">
                            <p>{{homeData.daiqueren}}</p>
                            <p>待确认金额</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="route_container">
            <el-row>
                <el-col :span="24"><div class="grid-title"><div class="title">实时概况
                    <el-tooltip class="item" effect="dark" content="实时概况" placement="right">
                        <i class="fa fa-question-circle"></i>
                    </el-tooltip>
                </div></div></el-col>
            </el-row>

            <el-row>
                <el-col :span="12" style="padding-right: 10px">
                    <div class="grid-content grid_echars">
                        <div style="width:100%; height:100px;" class="grid_title">
                            <p>入账收入</p>
                            <p>{{today.sum}}</p>
                            <p>昨日全天：{{yesterDay.sum}}</p>
                        </div>
                        <div id="chartColumn" style="width:100%; height:150px;"></div>
                    </div>
                </el-col>
                <el-col :span="12" style="padding-left: 10px">
                    <div class="grid-content grid_echars_text">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content">
                                    <p>入账收入</p>
                                    <p>{{today.sum}}</p>
                                    <p>昨日全天：{{yesterDay.sum}}</p>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content">
                                    <p>新增SVIP数</p>
                                    <p>{{today.new_svip}}</p>
                                    <p>昨日全天：{{yesterDay.new_svip}}</p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content">
                                    <p>新增VIP数</p>
                                    <p>{{today.new_vip}}</p>
                                    <p>昨日全天：{{yesterDay.new_vip}}</p>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content">
                                    <p>新增客户数</p>
                                    <p>{{today.new_putong}}</p>
                                    <p>昨日全天：{{yesterDay.new_putong}}</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24"><div class="grid-title"><div class="title">核心指标
                    <el-tooltip class="item" effect="dark" content="核心指标" placement="right">
                        <i class="fa fa-question-circle"></i>
                    </el-tooltip>
                    </div></div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <ul class="el-row-tab">
                        <li
                            v-for="(item,index) in tabs"
                            :class="{active:index == num}"
                            @click="tab(index)">{{item}}</li>
                    </ul>
                </el-col>
                <el-col :span="24">
                    <div id="tab-content" style="width: 100%;height: 400px"></div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import {getHomeData} from '../../api'
    import { mapState,mapMutations,mapGetters } from 'vuex';
    export default {
        data() {
            return {
                chartColumn: null,
                tabColum:null,
                tabs: ["入账收入", "新增SVIP数","新增VIP数","新增客户数"],
                num: 0,
                code:0,
                homeData: {},
                MonthDate : [],
                Month:{},
                today:{},
                yesterDay :{},
                yesterday24:[],
                admission: [],
                kehu: [],
                svip: [],
                vip: [],
                opinionData: []
            }
        },
        methods: {
            drawColumnChart(data) {
                let that = this
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    xAxis: {
                        type: 'category',
                        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        formatter: "{b}时<br/>{a}:  {c}"
                    },
                    grid:{
                        x:30,
                        y2:30,
                        x2:20,
                        y:10
                    },
                    yAxis: {
                        type : 'value',
                        splitNumber: 1,
                        scale: false,
                        splitLine:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        }
                    },
                    series: [{
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    color:'#3096ff'
                                }
                            }
                        },
                        name:'昨日',data: data,type: 'line'
                    }]
                });
            },
            drawTabColumChart(data,names){
                let that = this
                this.tabColum = echarts.init(document.getElementById('tab-content'));
                this.tabColum.setOption({
                    grid:{
                        x:30,
                        y2:30,
                        x2:20,
                        y:10
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        formatter: "{b}时<br/>{a}:  {c}"
                    },
                    xAxis: {
                        type: 'category',
                        data: that.MonthDate
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    color: 'orange'
                                }
                            }
                        },
                        data:data,name:names,
                        type: 'line'
                    }]
                })
            },
            tab(index) {
                let that = this
                this.num = index;
                this.code = index;
                let data = {token:this.GLOBAL.token}
                let names = ''
                switch(this.code){
                    case 0:
                        that.opinionData = that.admission
                        names = '入账收入'
                        break;
                    case 1:
                        that.opinionData = that.svip
                        names = '新增SVIP数'
                        break;
                    case 2:
                        that.opinionData = that.vip
                        names = '新增VIP数'
                        break;
                    case 3:
                        that.opinionData = that.kehu
                        names = '新增客户数'
                        break;
                    default:
                        that.opinionData = that.admission
                        names = '入账收入';
                } 
                that.drawTabColumChart(that.opinionData,names)
            },
            fetchData(){
                let that = this
                let data = {token:this.GLOBAL.token}
                getHomeData(data).then(res =>{
                    if(res.code === 0) {
                        that.homeData = res.result.data
                        that.Month = res.result.data.Month
                        for(let i in that.Month.svip){
                            that.MonthDate.push(i++)
                        }
                        for(let j in res.result.data.Month.admission){
                            that.admission.push(res.result.data.Month.admission[j])
                        }  
                        for(let k in res.result.data.Month.kehu){
                            that.kehu.push(res.result.data.Month.kehu[k])
                        }   
                        for(let l in res.result.data.Month.svip){
                            that.svip.push(res.result.data.Month.svip[l])
                        }   
                        for(let m in res.result.data.Month.admission){
                            that.vip.push(res.result.data.Month.vip[m])
                        }    
                        that.today = res.result.data.today
                        that.yesterDay = res.result.data.yesterday
                        that.yesterday24 = res.result.data.yesterday24
                        that.drawTabColumChart(that.admission,'入账收入')
                        that.drawColumnChart(that.yesterday24)
                    }
                })
            }
        },
        mounted() {
            console.log(this.$store)
            this.fetchData()
        },
        updated: function () {
        }
    }
</script>

<style scoped lang="scss">
    .el-row {
        margin-bottom: 10px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-row-border{
        margin: 24px 12px 24px 12px;
        border: 12px solid #f8f8f8;
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-title{
        line-height: 32px;
        background: #f8f8f8;
        .title {
            border-left: 4px solid orange;
            padding-left: 10px;
            .fa{
                color: #8c939d;
            }
        }

    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        border: 1px solid #e7e7e7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left_circle{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #cccccc;
            margin: 0 20px;
            color: #fff;
            text-align: center;
            .fa{
                line-height: 40px;
                font-size: 22px;
            }
        }
        .cir_blue{
            background: #4cc0c0;
        }
        .cir_org{
            background: #fdc332;
        }
        .cir_red{
            background: #f96c5a;
        }
        .right{
            flex:1;
            p{
                font-weight: 600;
                margin: 0;
                &:first-child{
                    font-size: 18px;
                    margin-top: 10px;
                }
                &:last-child{
                    color: #8a8685;
                    margin-bottom: 10px;
                }
            }
        }
    }
    .grid_echars{
        height: 250px;
        flex-direction: column;
        .grid_title{
            display: block;
            padding-left: 30px;
            p{
                margin: 0;
                line-height: 25px;
                &:nth-child(1){
                    padding-top: 20px;
                }
                &:nth-child(2){
                    font-weight: 600;
                }
            }
        }
    }
    .grid_echars_text{
        height: 250px;
        background: #f8f8f8;
        flex-direction: column;
        .el-row{
            width: 100%;
            flex: 1;
            .grid-content{
                height: 125px;
                border: none;
                display: block;
                text-align: left;
                padding-left: 30px;
                p{
                    margin: 0;
                    width: 100%;
                    flex: 1;
                    line-height: 25px;
                    &:nth-child(1){
                        padding-top: 20px;
                    }
                    &:nth-child(2){
                        font-weight: 600;
                    }
                }
            }
        }
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-row-tab{
        list-style: none;
        border: 2px solid #d6d6d6;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        padding: 0;
        line-height: 36px;
        li{
            display: inline-block;
            width: 100%;
            text-align: center;
            cursor: pointer;
            &.active{
                background: #ededed;
            }
        }
    }
</style>
