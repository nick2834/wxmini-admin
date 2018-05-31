<template>
	<section>
		<!--工具条-->
		<el-col :span="18" class="toolbar"  style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-button class="fa fa-refresh" @click="getDataList"></el-button>
				<el-button  @click="exportTables" class="fa fa-download">导出列表</el-button>
				<el-date-picker
				v-model="value6"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
				</el-date-picker>
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
		<el-table :data="datalist" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="orderid" label="提现单号" min-width="150">			
			</el-table-column>
			<el-table-column prop="paymode" label="提现方式" min-width="120">
			</el-table-column>
			<el-table-column label="提现帐户信息" min-width="300">
				<template slot-scope="scope">
					<p>
						认证姓名：{{scope.row.fullname}}<br/>
						收款帐号：{{scope.row.nickname}}（{{scope.row.openid}}）
					</p>
				</template>					
			</el-table-column>
			<el-table-column prop="money" label="提现金额（元）" min-width="120">
			</el-table-column>
			<el-table-column label="处理时间" min-width="180">
				<template slot-scope="scope">
					<span>申请：{{scope.row.create_time}}<br/></span>
					<span v-if="scope.row.status == 1">
						打款：{{scope.row.last_time}}<br/>
					</span>
					<span v-if="scope.row.status == 4">
						拒绝：{{scope.row.last_time}}<br/>
					</span>					
				</template>					
			</el-table-column>
			<el-table-column prop="state" label="状态" min-width="120">
			</el-table-column>
			<el-table-column prop="remarks" label="备注" min-width="200">
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
	import { getwithdrawList} from '../../api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				datalist: [],
				total: 0,
				page: 1,
				pagesize:10,
				listLoading: false,
				sels: [],//列表选中列
				input:'',
				value6:'',
				options: [
					{
					value: '选项1',
					label: '所有状态'
					},{
					value: '选项2',
					label: '待打款'
					}, {
					value: '选项3',
					label: '已打款'
					}, {
					value: '选项4',
					label: '已拒绝'
					}, {
					value: '选项5',
					label: '处理中'
					}, {
					value: '选项6',
					label: '打款失败'
					}
				],
				optionsValue: '选项1',
			}
		},
		methods: {
			//搜索
			searchList(e){},
			//报表导出
			exportTables(e){
				this.downloadLoading = true
				require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel')
                    const tHeader = ['订单编号', '微信昵称', '手机号', '支付金额', '下单时间','付款时间','分润','状态']
                    const filterVal = ['orderid','nickname','mobile','money','create_time','pay_time','user_vip_count','state',]
                    const list = this.datalist
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
			//分页加载
			handleCurrentChange(val) {
				this.page = val;
				this.getDataList();
			},
			//获取提现列表
			getDataList() {
				let para = {
					page: this.page,
					token: this.GLOBAL.token
				};
				this.listLoading = true;
				getwithdrawList(para).then((res) => {
					this.total = res.data.result.total;
					if(res.data.code == 0){
					   this.datalist = res.data.result.data;
					}
					this.listLoading = false;
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.getDataList();
		}
	}

</script>

<style scoped>

</style>