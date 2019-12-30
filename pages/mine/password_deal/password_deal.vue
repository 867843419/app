<template>
	<view class="page animation-slide-right">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改交易密码</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">交易密码</view>
				<input type="password" placeholder="请输入你的新交易密码" name="exchangePassword" v-model="form.exchangePassword" readonly data-name="exchangePassword" @click="showKeyBoard"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">确认密码</view>
				<input type="password" placeholder="请确认你的新交易密码" name="reexchangePassword" v-model="form.reexchangePassword" readonly data-name="reexchangePassword" @click="showKeyBoard"></input>
			</view>
			<view class="padding-xl">
				<button class="cu-btn block bg-custom margin-tb-sm lg" @click="reqSP">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 
					确认提交
				</button>
			</view>
		</form>
		<tki-float-keyboard ref="fkeyb" title="ESD 安全键盘" mode="keyboard" type="0" @val="keyVal" @del="keyDel" @show="keyShow" @hide="keyHide"></tki-float-keyboard>
		<secure-problem ref="secureProblem" @cancel="cancelSP" @complete="completeSP"></secure-problem>
	</view>
</template>

<script>
	import {justUser} from '@/api/index.js';
	import {apiEditPasswordDeal} from '@/api/user.js';
	import tkiFloatKeyboard from '@/components/tki-float-keyboard/tki-float-keyboard.vue';
	import secureProblem from '@/components/secure-problem/secure-problem.vue';
	export default {
		components: {
		    tkiFloatKeyboard,
			secureProblem,
		},
		data() {
			return {
				loginUser: justUser().loginUser,
				submiting: false,
				form: {
					exchangePassword: '',
					reexchangePassword: '',
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
			showKeyBoard(e){
				console.log(e);
				this.keyActive = e.target.dataset.name;
				this.$refs.fkeyb._keyShow();	
			},
			doSubmit(){
				if(!this.submiting){
					this.submiting = true;
					apiEditPasswordDeal(
						this.form.exchangePassword, 
						res => {
							uni.showToast({
								title: '修改成功',
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
			check(){
				return this.validator.password_deal(this.form);
			},
			reqSP() {
				this.$refs.fkeyb._keyHide();
				if (this.check()) {
					this.$refs.secureProblem.open(this.loginUser.username);
				}
			},
			cancelSP() {
				this.successSP = false;
				this.submiting = false;
			},
			completeSP(res) {
				this.successSP = res === 250;
				if (this.successSP) {
					this.doSubmit();
				}else{
					this.submiting = false;
				}
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
