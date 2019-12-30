<template>
	<view class="page animation-slide-right">
		<cu-custom ref="nav" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">交割</block>
		</cu-custom>
		<form>
			<view class="cu-form-group text-right margin-top">
				<view class="title">交割类型</view>
				<input type="text" placeholder="请选择交割类型" name="deliverType" v-model="form.deliverType" data-name="deliverType" disabled></input>
			</view>
			<view class="cu-form-group text-right">
				<view class="title">数量</view>
				<uni-number-box :min="50" :max="isNotBlank(loginUser.point)?loginUser.point:50" :step="50" :value="50"  @change="changeCount" ></uni-number-box>
			</view>
			<view class="cu-form-group text-right margin-top">
				<view class="title">交易密码</view>
				<input type="password" placeholder="请填写交易密码" name="exchangePassword" v-model="form.exchangePassword" readonly data-name="exchangePassword" @click="showKeyBoard"></input>
			</view>
			<view class="padding text-right"><text @click="goChangeDealPasw"> 忘记交易密码? </text></view>
			<view class="padding-xl" style="padding-top:0;">
				<button class="cu-btn block bg-custom margin-tb-sm lg" @click="doSubmit">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 
					确认
				</button>
			</view>
		</form>
		<tki-float-keyboard ref="fkeyb" title="ESD 安全键盘" mode="keyboard" type="0" @val="keyVal" @del="keyDel" @show="keyShow" @hide="keyHide"></tki-float-keyboard>
	</view>
</template>

<script>
	import tkiFloatKeyboard from '@/components/tki-float-keyboard/tki-float-keyboard.vue';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import {justUser} from '@/api/index.js';
	import {apiDeliver} from '@/api/deal.js';
	export default {
		components: {
		    tkiFloatKeyboard,
			uniNumberBox,
		},
		data() {
			return {
				loginUser: justUser().loginUser,
				submiting: false,
				form: {
					deliverType: '交割积分',
					deliverCount: '',
					exchangePassword: '',
				},
				keyActive: '',
				successSP: false,
			};
		},
		onLoad(){
		},
		mounted(){
		},
		methods: {
			changeCount(value){
				this.form.deliverCount = value;
			},
			goChangeDealPasw(){
				uni.navigateTo({
					url: '/pages/mine/password_deal/password_deal'
				});
			},
			showKeyBoard(e){
				console.log(e);
				this.keyActive = e.target.dataset.name;
				this.$refs.fkeyb._keyShow();	
			},
			doSubmit(){
				if(!this.submiting){
					if(this.validator.deliver(this.form)){
						this.submiting = true;
						apiDeliver(
							this.form, 
							res => {
								uni.showToast({
									title: ' 交割成功',
									icon: 'success',
									position: 'top',
									complete: () => {
										this.$refs.fkeyb._keyHide();
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
			},
			keyVal(v){
				console.log(v);
				this.form[this.keyActive] = this.form[this.keyActive] + v;
			},
			keyDel(){
				let d = this.form[this.keyActive];
				this.form[this.keyActive] = d.substring(0,d.length-1);
			},
			keyShow(h){
				console.log('keyShow');
				console.log(h);
			},
			keyHide(){
				console.log('keyHide');
			},
		}
	}
</script>

<style>
	page,.page{
		height: 100vh;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
