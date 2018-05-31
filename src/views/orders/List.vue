<template>
	<section>
		<!--工具条-->
		<el-col :span="18" class="toolbar">
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
			<el-table-column prop="orderid" label="订单编号" min-width="200">			
			</el-table-column>
			<el-table-column prop="type_name" label="所属业务" min-width="120">
			</el-table-column>
			<el-table-column label="客户信息" min-width="200">
				<template slot-scope="scope">
					<p>
						昵称：{{scope.row.nickname}}<br/>
						手机：{{scope.row.mobile}}<br/>
					</p>
				</template>					
			</el-table-column>
			<el-table-column label="付款金额" min-width="100">
				<template slot-scope="scope">
					￥{{scope.row.order_money}}
				</template>	
			</el-table-column>
			<el-table-column label="付款/到帐时间" min-width="220">
				<template slot-scope="scope">
					付款：{{scope.row.payment_time}}<br/>
					到帐：{{scope.row.distribute_time}}
				</template>					
			</el-table-column>
			<el-table-column label="我的收入" min-width="100">	
				<template slot-scope="scope">
				 ￥{{scope.row.commision}}
				</template>				
			</el-table-column>	
			<el-table-column label="SVIP收入" min-width="100">	
				<template slot-scope="scope">
				 ￥{{scope.row.svip_money}}
				</template>				
			</el-table-column>
			<el-table-column label="VIP收入" min-width="100">	
				<template slot-scope="scope">
				 ￥{{scope.row.vip_money}}
				</template>				
			</el-table-column>								
			<el-table-column label="退款金额" min-width="100">
				<template slot-scope="scope">
				 ￥{{scope.row.refund_money}}
				</template>					
			</el-table-column>
			<el-table-column prop="state" label="状态" min-width="100">
			</el-table-column>
			<el-table-column prop="remarks" label="操作" min-width="100">
				<template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
				</template>
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
	import { getOrdersList} from '../../api';
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
				value6: '',
				input:''
			}
		},
		methods: {
			handleEdit(index,row){
				console.log(index)
				console.log(row)
				let id = row.id
				this.$router.push({path: `/orders/${id}`});
			},
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
				getOrdersList(para).then((res) => {
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