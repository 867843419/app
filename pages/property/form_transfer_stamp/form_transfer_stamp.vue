<template>
	<view class="page animation-slide-right">
		<cu-custom ref="nav" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">交易券转让</view>
		</cu-custom>
		<view>
			<form>
				<view class="cu-form-group margin-top text-right">
					<view class="title">交易券余额</view>
					<input type="number" placeholder="" name="propertyCount" v-model="form.propertyCount" disabled></input>
				</view>
				<view class="cu-form-group text-right">
					<view class="title">转让额度</view>
					<input type="number" placeholder="请输入转让额度" name="propertyConvert" v-model="form.propertyConvert"></input>
				</view>
				<view class="cu-form-group text-right margin-top">
					<view class="title">手机号/账号</view>
					<input type="text" placeholder="请输入对方手机号/用户名" name="targetUserCode" v-model="form.targetUserCode" @blur="getTu"></input>
				</view>
				<view class="cu-form-group text-right">
					<view class="title">对应账户</view>
					<view v-if="form.targetUserRealname === '' && sbFail"><text class="cuIcon-info text-red text-bold"> 获取失败!</text> </view>
					<input v-else type="text" placeholder="" name="targetUserRealname" v-model="form.targetUserRealname" disabled></input>
				</view>
				<view class="cu-form-group text-right margin-top">
					<view class="title">交易密码</view>
					<input type="password" placeholder="请确认您的交易密码" name="dealPassword" v-model="form.dealPassword"></input>
				</view>
			</form>
			<view class="cu-form-group margin-top bg-none">
				<button class="submit-btn cu-btn block bg-green margin-tb-sm lg" @click="doSubmit">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 确认转让
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {justUser} from '@/api/index.js';
	import {apiFormTransferStamp} from '@/api/property.js';
	import {apiGetOneFriend} from '@/api/user.js';
	export default {
		data() {
			return {
				loginUser: justUser().loginUser,
				submiting: false,
				sbFail: false,
				form: {
					propertyCount: (this.isNotBlank(this.loginUser.tradingVolume) && !isNaN(this.loginUser.tradingVolume))?this.loginUser.tradingVolume:0,
					propertyConvert: '',
					targetUserCode: '',
					targetUserRealname: '',
					dealPassword: '',
					targetUserId: -1,
				}
			}
		},
		methods: {
			getTu(){
				if(this.isNotBlank(this.form.targetUserCode)){
					apiGetOneFriend({
						loginname: this.form.targetUserCode,
					}, res => {
						console.log(res);
						this.sbFail = false;
						this.form.targetUserRealname = res.data.realname;
						this.form.targetUserId = res.data.userId;
					}, res=>{
						if(this.isBlank(this.targetUserRealname)){
							this.sbFail = true;
						}else{
							this.sbFail = false;
						}
					});
				}
			},
			 doSubmit(){
				 if (!this.submiting) {
				 	if(this.validator.property_stamp(this.form)){
				 		this.submiting = true;
				 		apiFormTransferStamp(
				 			{
				 				userId: this.loginUser.userId,
				 				toId:  this.form.targetUserId,
				 				count: this.form.propertyConvert,
				 				dealPassword: this.form.dealPassword,
				 			},
				 			res => {
				 				uni.showToast({
				 					title: '转让成功',
				 					icon: 'success',
				 					position: 'top',
				 					complete: () => {
				 						this.submiting = false;
										setTimeout(() => {
											this.$refs.nav.BackPage();
										}, 1500);
				 					}
				 				});
				 			},
				 			() => {
				 				this.submiting = false;
				 			}
				 		);
				 	}
				 }
			 }
		}
	}
</script>

<style>
.submit-btn{
	width: 100%;
}
</style>
