<template>
	<view class="page animation-slide-right">
		<cu-custom ref="nav" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">诚信金兑换</view>
		</cu-custom>
		<view>
			<form>
				<view class="cu-form-group margin-top text-right">
					<view class="title">诚信金余额</view>
					<input type="number" placeholder="" name="honestCount" v-model="form.honestCount" disabled></input>
				</view>
				<view class="cu-form-group text-right">
					<view class="title">兑换额度</view>
					<input type="number" placeholder="请输入兑换数量" name="honestConvert" v-model="form.honestConvert"></input>
				</view>
				<view class="cu-form-group text-right margin-top">
					<view class="title">交易密码</view>
					<input type="password" placeholder="请确认您的交易密码" name="dealPassword" v-model="form.dealPassword"></input>
				</view>
			</form>
			<view class="cu-form-group margin-top bg-none">
				<button class="submit-btn cu-btn block bg-green margin-tb-sm lg" @click="doSubmit">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 确认兑换
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {justUser} from '@/api/index.js';
	import {apiFormConvertHonest} from '@/api/property.js';
	export default {
		data() {
			return {
				loginUser: justUser().loginUser,
				submiting: false,
				form: {
					honestCount: (this.isNotBlank(this.loginUser.credibleMoney) && !isNaN(this.loginUser.credibleMoney))?this.loginUser.credibleMoney:0,
					honestConvert: '',
					dealPassword: '',
				}
			}
		},
		methods: {
			doSubmit(){
				if (!this.submiting) {
					if(this.validator.property_honest(this.form)){
						this.submiting = true;
						apiFormConvertHonest(
							{
								credibleMoney: this.form.honestConvert,
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
