<template>
	<section>
		<el-tabs @tab-click="handleClick"> 
			<el-tab-pane label="SVIP管理">
					<!--工具条-->
					<el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
						<el-form :inline="true" :model="filters">
							<el-button class="fa fa-refresh" @click="getUsers"></el-button>
							<el-form-item>
								<el-select v-model="optionsValue" placeholder="请选择">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-button  @click="exportTables">导出列表</el-button>							
						</el-form>
					</el-col>	
					<el-col :span="6" class="toolbar"  style="padding-bottom: 0px;">
						<el-form :inline="true" :model="filters">
							<el-form-item style="margin-right:0">
								<el-input v-model="input" placeholder="请输入微信或手机号"></el-input>
							</el-form-item>
							<el-button class="fa fa-search"  @click="searchList"></el-button>							
						</el-form>	
					</el-col>				
					<!--列表-->
					<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column label="基本信息" min-width="220">
								<template slot-scope="scope">
									<p style="float:left;"><img style="width:50px;height:50px;" :src="scope.row.avatar"/></p>
									<p style="float:left;padding-left:10px;">{{scope.row.nickname}}<br/>{{scope.row.mobile}}</p>
								</template>				
						</el-table-column>
						<el-table-column prop="vip_time" label="加入时间" min-width="180" sortable>
						</el-table-column>
						<el-table-column prop="invite" label="上级" min-width="180">
						</el-table-column>
						<el-table-column prop="user_total_count" :header-click="headerClick" label="分佣客户" min-width="100">
						</el-table-column>
						<el-table-column prop="user_vip_count" label="下级VIP" min-width="100">
						</el-table-column>
						<el-table-column prop="user_svip_count" label="下级SVIP" min-width="100">
						</el-table-column>
						<el-table-column prop="recommend_money" label="推荐收入" min-width="100">
						</el-table-column>
						<el-table-column prop="status" label="帐户状态" min-width="100">
						</el-table-column>									
						<el-table-column label="操作" min-width="100">
							<template slot-scope="scope">
								<el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
							</template>
						</el-table-column>			
					</el-table>

					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<div style="float:left;line-height: 30px;">总共{{total}}条，当前为第{{page}}页</div>
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
						</el-pagination>
					</el-col>			
			</el-tab-pane>
			<el-tab-pane label="SVIP申请订单">
					<!--工具条-->
					<el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
						<el-form :inline="true" :model="filters">
							<el-button class="fa fa-refresh" @click="getUsers"></el-button>
							<el-form-item>
								<el-select v-model="optionsValue2" placeholder="请选择">
									<el-option
									v-for="item in options2"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-button  @click="exportTables2">导出列表</el-button>							
						</el-form>
					</el-col>	
					<el-col :span="6" class="toolbar"  style="padding-bottom: 0px;">
						<el-form :inline="true" :model="filters">
							<el-form-item style="margin-right:0">
								<el-input v-model="input" placeholder="请输入微信或手机号"></el-input>
							</el-form-item>
							<el-button class="fa fa-search"  @click="searchList"></el-button>							
						</el-form>	
					</el-col>		
					<!--列表-->
					<el-table :data="orderlist" highlight-current-row v-loading="listLoading" style="width: 100%;">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column label="头像" min-width="120">
								<template slot-scope="scope">
									<p style="float:left;"><img style="width:60px;height:60px;" :src="scope.row.avatar"/></p>
								</template>				
						</el-table-column>
						<el-table-column prop="nickname" label="微信昵称" min-width="120" sortable>
						</el-table-column>
						<el-table-column prop="mobile" label="手机号码" min-width="120">
						</el-table-column>
						<el-table-column label="支付金额" min-width="120">
							<template slot-scope="scope">
								￥{{scope.row.money}}
							</template>
						</el-table-column>				
						<el-table-column label="交易信息" min-width="220">
								<template slot-scope="scope">
									订单编号：{{scope.row.orderid}}<br/>
									下单时间：{{scope.row.create_time}}<br/>
									付款时间：{{scope.row.pay_time}}
								</template>						
						</el-table-column>
						<el-table-column prop="user_vip_count" label="分润信息" min-width="180">
						</el-table-column>
						<el-table-column prop="state" label="状态" min-width="100">
						</el-table-column>				
					</el-table>
					<!--工具条-->
					<el-col :span="24" class="toolbar">
						<div style="float:left;line-height: 30px;">总共{{total}}条，当前为第{{page}}页</div>
						<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
						</el-pagination>
					</el-col>			
			</el-tab-pane>
		</el-tabs>		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserSvipListPage, getSvipOrdersPage } from '../../api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				type:0,
				users: [],
				orderlist:[],
				total: 0,
				page: 1,
				pagesize:10,
				listLoading: false,
				filename:"SVIP管理",
				filename:"SVIP申请订单",
				options: [
					{
					value: '选项1',
					label: '全部状态'
					},{
					value: '选项2',
					label: '正常'
					}, {
					value: '选项3',
					label: '冻结'
					}
				],
				optionsValue: '选项1',
				options2: [
					{
					value: '选项1',
					label: '全部状态'
					},{
					value: '选项2',
					label: '已支付'
					}, {
					value: '选项3',
					label: '未支付'
					}
				],
				optionsValue2: '选项1',
				input:''
			}
		},
		methods: {
			headerClick(c,e){
				console.log(c,e)
			},
			//刷新
			refreshBtn(e){
				console.log(e)
			},
			//列表导出
			exportTables(e){
				this.downloadLoading = true
				require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel')
                    const tHeader = ['序号', '昵称', '上级', '加入时间', '手机号','分佣客户','下级VIP','下级SVIP','推荐收入']
                    const filterVal = ['uid', 'nickname', 'invite', 'vip_time', 'mobile','user_total_count','user_vip_count','user_svip_count','recommend_money']
                    const list = this.users
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, this.filename)
                    this.downloadLoading = false
                })
			},
			exportTables2(e){
				this.downloadLoading = true
				require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel')
                    const tHeader = ['订单编号', '微信昵称', '手机号', '支付金额', '下单时间','付款时间','分润','状态']
                    const filterVal = ['orderid','nickname','mobile','money','create_time','pay_time','user_vip_count','state',]
                    const list = this.orderlist
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, this.filename)
                    this.downloadLoading = false
                })
			},
			formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
					return v[j]
                }))
            },
		    //查看详情
            handleEdit(index,row){
				let id = row.uid
                this.$router.push({path: `/svip/${id}`});
			},
			handleClick(tab, event) {
				this.page = 1;
				if(tab.index == 0){
					this.getUsers();
				}else{
					this.getOrders()
				}
			},			
			//分页加载
			handleCurrentChange(val) {
				this.page = val;
				if(tab.index == 0){
					this.getUsers();
				}else{
					this.getOrders()
				}
			},
			//获取SVIP用户列表
			getUsers() {
				let para = {
					page: this.page,
					token: this.GLOBAL.token
				};
				this.listLoading = true;
				//NProgress.start();
				getUserSvipListPage(para).then((res) => {
					this.total = res.data.result.total;
					if(res.data.code == 0){
					   this.users = res.data.result.data;
					}
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//加载SVIP申请订单
			getOrders(){
				let para = {
					page: this.page,
					token: this.GLOBAL.token
				};
				this.listLoading = true;				
               getSvipOrdersPage(para).then((res) => {
					this.total = res.data.result.total;
					if(res.data.code == 0){
					   this.orderlist = res.data.result.data;
					}
					this.listLoading = false;
				});
			},
			//搜索
			searchList(e){

			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>