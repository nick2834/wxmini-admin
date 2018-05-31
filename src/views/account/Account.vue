<template>
	<section style="overflow:hidden">
		<div class="head_bar">我的账户</div>
		<div class="content">
			<el-row>
				<el-col :span="12">			
					<div class="grid-content">
						<div class="item first_item">
							<div class="label first_label">渠道名称</div>
							<span class="first_child">{{accounts.name}}</span>
						</div>
						<div class="item first_item">
							<el-tooltip effect="dark" content="已提现总额加上提现中金额总和" placement="right">
								<div class="label last first_label">提现总额[<i class="fa fa-question"></i>]</div>
							</el-tooltip>
							<span class="first_child">￥{{accounts.withdraw_money}}元</span>					
						</div>
						<div class="item first_item">
							<el-tooltip effect="dark" content="已提现并汇款成功的金额总和" placement="right">
								<div class="label last first_label">已提现总额[<i class="fa fa-question"></i>]</div>
							</el-tooltip>
							<span class="first_child">￥{{accounts.withdraw_ok_money}}元</span>
						</div>	
						<div class="line_throw"></div>
						<div class="item first_item">
							<div class="label first_label">提现方式</div>
							<span class="first_child">{{accounts.withdraw_type}}</span>
						</div>	
						<div class="item first_item">
							<div class="label first_label">认证姓名</div>
							<span class="first_child">{{accounts.fullname}}</span>
						</div>
						<div class="item first_item">
							<div class="label first_label">收款帐号</div>
							<span class="first_child">{{accounts.accountname}}</span>
						</div>			
					</div>
				</el-col>
				<el-col :span="12">			
					<div class="grid-content">
						<div class="item">
							<el-tooltip effect="dark" content="已下单但未分配至账户余额的佣金总和" placement="right">
								<div class="label last">待确认佣金[<i class="fa fa-question"></i>]</div>
							</el-tooltip>
							<span>￥{{accounts.waitmoney}}元</span>
						</div>
						<div class="item">
							<el-tooltip effect="dark" content="当前可用于提现的账户金额" placement="right">
								<div class="label last">帐户余额[<i class="fa fa-question"></i>]</div>
							</el-tooltip>
							<span>￥{{accounts.money}}元</span>	
						</div>	
						<div class="item">
							<el-tooltip effect="dark" content="申请提现中但未到账的金额" placement="right">
								<div class="label last">提现中金额[<i class="fa fa-question"></i>]</div>
							</el-tooltip>
							<span>￥{{accounts.withdraw_wait_money}}元</span>	
						</div>
						<el-row class="func_box">
							<el-button type="danger" @click="dialogFormVisible  = true">申请提现</el-button>
							<div>
								<router-link to="/orders">财务明细</router-link>
								<router-link to="/withdraw">提现记录</router-link>
							</div>
							
						</el-row>
					</div>
				</el-col>
			</el-row>
			<el-dialog title="申请提现" :visible.sync="dialogFormVisible" center="true">
				<el-form :model="form">
					<el-form-item label="金额" :label-width="formLabelWidth">
					<el-input v-model="form.money" auto-complete="off" placeholder="请输入提现金额"></el-input>
					</el-form-item>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="confirmApply">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserAccount, getApply } from '../../api';
	export default {
		data() {
			return {
				accounts: [],
				listLoading: false,
				dialogFormVisible:false,
				form: {
					money: null
				},
				formLabelWidth: '50px'
			}
		},
		methods: {
			//分页加载
			handleCurrentChange(val) {
				this.page = val;
				this.getAccount();
			},
			//获取用户列表
			getAccount() {
				let para = {
					token:this.GLOBAL.token
				};
				this.listLoading = true;
				getUserAccount(para).then((res) => {
					if(res.data.code == 0){
					   this.accounts = res.data.result.data;
					}
					this.listLoading = false;
				});
			},
			getApplyMoney(money){
				let that = this
				let para = {
					money: money,
					token:this.GLOBAL.token
				};
				getApply(para).then(res =>{
					if(res.code === 0){
						that.$notify({
							title: '温馨提示',
							message: res.msg,
							type: 'success'
						});
					}else{
						that.$notify({
							title: '温馨提示',
							message: res.msg,
							type: 'warning'
						});
					}
					that.dialogFormVisible = false
				})
			},
			confirmApply(e){
				let that = this
				if(this.form.money === '' ||this.form.money === null ){
					that.$notify({
						title: '警告',
						message: '请输入正确的提现金额，最低一元',
						type: 'warning'
					});
					return
				}
				console.log(this.form.money)
				this.getApplyMoney(this.form.money)
			}
		},
		mounted() {
			this.getAccount();
		}
	}

</script>

<style scoped lang="scss">
.el-dialog--small{
	width: 30% !important;
}
    .content{
        width: calc(100% - 30px);
		margin: 15px;
        border: rgb(224, 224, 224) 1px solid;
		display: inline-block;
    }
	.grid-content{
		min-height: 300px;
		padding: 20px;
		position: relative;
		.item{
			display: flex;
			line-height: 50px;
			font-size: 14px;
			font-weight: 600;
			color: #727272;
			flex-direction: column;
			.first_child{
				text-align: right;
				padding-left: 30px;
				
			}
			.label{
				min-width: 100px;
				max-width: 100px;
				text-align: right;
				.fa{
					cursor: pointer;
				}
			}
			.first_label{
				line-height: 50px;
				padding-left: 300px;
				text-align: right !important;
			}
			.value{
				padding-left: 15px; 		
			}
		}
		.first_item{
			flex-direction: row
		}
		.func_box{
			position: absolute;
			top: 20%;
			left: 50%;
			div{
				margin-top: 20px;
				a{
					color: #455666;
					font-weight: 600;
					
					&:first-child{
						padding-right: 10px;
						border-right: 1px solid #455666
					}
					&:last-child{
						padding-left: 10px;
					}
				}
			}
		}
		&:first-child{
			border-left: rgb(224, 224, 224) 1px solid;
		}
		.last{
			text-align: left !important;
			line-height: 40px
		}
		.line_throw{
			width: 100%;
			height: 1px;
			background: rgb(224, 224, 224)
		}
	}
</style>