<template>
	<view class="page animation-slide-right">
		<cu-custom ref="nav" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">预约</block>
		</cu-custom>
		<form>
			<view class="cu-form-group text-right margin-top">
				<view class="title">预约天数</view>
				<uni-number-box :min="3" :max="30" :step="1" :value="3"  @change="changeDay" ></uni-number-box>
			</view>
			<view class="cu-form-group text-right">
				<view class="title">开仓积分</view>
				<picker @change="PickerChange1" :value="problem1" :range="picker">
					<view class="picker" :style="problem1 > 0 ? 'color:#333;' : ''">{{ problem1 > 0 ? picker[problem1] : '请选择开仓积分' }}</view>
				</picker>
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
	import {apiRepo, apiSubscribe} from '@/api/deal.js';
	import {justUser} from '@/api/index.js';
	export default {
		components: {
		    tkiFloatKeyboard,
			uniNumberBox,
		},
		data() {
			return {
				loginUser: justUser().loginUser,
				problem1: -1,
				repos: [],
				picker: [''],
				repo: {},
				submiting: false,
				form: {
					osRepositoryId: '',
					appointDay: '',
					appointOpenPoint: '',
					exchangePassword: '',
				},
				keyActive: '',
				successSP: false,
			};
		},
		onLoad(){
		},
		created(){
			apiRepo(res => {
				console.log(res);
				this.repos = res.data;
				this.repos.forEach((item)=>{
					this.picker.push(item.rmoneyLimit);
				});
			});
		},
		mounted(){
		},
		methods: {
			PickerChange1(e) {
				this.problem1 = e.detail.value;
				this.repo = this.repos[this.problem1 - 1];
				this.appointDay = this.repo;
				this.form.osRepositoryId = this.repo.rid;
			},
			changeDay(value){
				this.form.appointDay = value;
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
					if(this.validator.appoint(this.form)){
						this.submiting = true;
						apiSubscribe(
							this.form, 
							res => {
								uni.showToast({
									title: '预约成功',
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
