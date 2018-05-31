<template>
	<section>
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
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="基本信息" min-width="220">
					<template slot-scope="scope">
						<p style="float:left;"><img style="width:50px;height:50px;" :src="scope.row.avatar"/></p>
						<p style="float:left;padding-left:10px;">
							昵称：{{scope.row.nickname}}<br/>
						    关注：{{scope.row.create_time}}<br/>
						</p>
					</template>				
			</el-table-column>
			<el-table-column prop="identity" label="身份" min-width="180">
			</el-table-column>
			<el-table-column prop="invite" label="上级" min-width="180">
			</el-table-column>
			<el-table-column prop="money" label="帐号余额（元）" min-width="120">
			</el-table-column>
			<el-table-column prop="totalmoney" label="累计收入（元）" min-width="120">
			</el-table-column>
			<el-table-column prop="waitmoney" label="待确认收入（元）" min-width="120">
			</el-table-column>
			<el-table-column prop="withdraw_wait_money" label="提现中（元）" min-width="120">
			</el-table-column>
			<el-table-column prop="withdraw_ok_money" label="已提现（元）" min-width="120">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
	        <div style="float:left;line-height: 30px;">总共{{total}}条，当前为第{{page}}页</div>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>


	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage} from '../../api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				pagesize:10,
				listLoading: false,
				sels: [],//列表选中列
				options: [
					{
					value: '选项1',
					label: '所有身份'
					},{
					value: '选项2',
					label: '渠道'
					}, {
					value: '选项3',
					label: 'SVIP'
					}, {
					value: '选项4',
					label: 'VIP'
					}, {
					value: '选项5',
					label: '客户'
					}
				],
				optionsValue: '选项1',
				input:''
			}
		},
		methods: {
			searchList(e){},
			//分页加载
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//列表到处
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
			formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
					return v[j]
                }))
            },
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					token: this.GLOBAL.token
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.result.total;
					if(res.data.code == 0){
					   this.users = res.data.result.data;
					}
					this.listLoading = false;
					//NProgress.done();
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>