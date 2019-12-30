<template>
	<view class="page animation-slide-right">
		<cu-custom :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">邀请注册</view>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="0 == TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="0">分享注册链接</view>
				<view class="cu-item flex-sub" :class="1 == TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="1">帮他人注册</view>
			</view>
		</scroll-view>
		<view v-show="0 == TabCur" class="share-link padding-top">
			<!-- <img class="img-top" src="/static/mine/share-top.png" alt="" /> -->
			<view class="invite-person padding" style="margin-top: 100upx;">
				<text class="text-orange text-lg">{{ username }}</text>
				<text class="text-white text-lg margin-left-sm">的专属链接</text>
			</view>
			<view class="padding">
				<text class="zxx-ilink text-white lg text-xl text-bold padding">{{ ilink }}</text>
			</view>
			<view class="padding">
				<button
					class="clip-btn cu-btn round bg-green item-btn"
					v-clipboard:copy="ilink"
					v-clipboard:success="type => onCopyResult('success')"
					v-clipboard:error="type => onCopyResult('error')"
				>
					复制专属链接
				</button>
			</view>
			<view class="padding"><qrcode :val="ilink" :size="qrsize" ref="qrcode"></qrcode></view>
			<view class=""><text class="text-white">扫描二维码注册 ESD期证循环交易系统</text></view>
		</view>
		<view v-show="1 == TabCur" class="">
			<scroll-view scroll-y class="content">
				<view class="login-bg">
					<view class="login-card">
						<view class="login-input login-margin-b cu-form-group">
							<input type="text" v-model="form.phone" placeholder="手机号" />
							<view class="cu-capsule radius">
								<view class="cu-tag bg-blue ">+86</view>
								<view class="cu-tag line-blue">中国大陆</view>
							</view>
						</view>
						<view class="login-input login-margin-b"><input type="text" v-model="form.username" placeholder="用户名" /></view>
						<view class="login-input login-margin-b"><input type="password" v-model="form.password" placeholder="登录密码" /></view>
						<view class="login-input login-margin-b"><input type="password" v-model="form.repassword" placeholder="确认登录密码" /></view>
						<view class="login-input login-margin-b"><input type="password" v-model="form.exchangePassword" placeholder="交易密码" /></view>
						<view class="login-input login-margin-b"><input type="password" v-model="form.reexchangePassword" placeholder="确认交易密码" /></view>
						<view class="login-input login-margin-b cu-form-group">
							<picker @change="PickerChange1" :value="problem1" :range="picker">
								<view class="picker" :style="problem1 > 0 ? 'color:#333;' : ''">{{ problem1 > 0 ? picker[problem1] : '安全问题 1' }}</view>
							</picker>
						</view>
						<view class="login-input login-margin-b"><input type="text" v-model="form.answer1" placeholder="安全问题 1 答案" /></view>
						<view class="login-input login-margin-b cu-form-group">
							<picker @change="PickerChange2" :value="problem2" :range="picker">
								<view class="picker" :style="problem2 > 0 ? 'color:#333;' : ''">{{ problem2 > 0 ? picker[problem2] : '安全问题 2' }}</view>
							</picker>
						</view>
						<view class="login-input login-margin-b"><input type="text" v-model="form.answer2" placeholder="安全问题 2 答案" /></view>
						<view class="login-input login-margin-b"><input type="text" :value="'推荐人: ' + form.recommendedUser.username" placeholder="推荐人" disabled /></view>
						<view class="login-input login-margin-b">
							<view class="verify-left"><input type="text" placeholder="请输入验证码" v-model="form.code" /></view>
							<view class="verify-right"><img :src="imgCode" @click="refreshCode" class="verify-btn" alt="" /></view>
						</view>
						<view class="login-function"><view class="login-register"></view></view>
					</view>
				</view>
				<view class="login-btn animation-fade"><button class="landing bg-custom" type="primary" @click="doReg">免费注册</button></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import qrcode from '../../../components/qrcode/qrcode.vue';
import { apiReg, apiInfo } from '@/api/auth.js';
import { problemBank } from '@/util/problem.js';
import {justUser} from '@/api/index.js';
let loginUser = justUser().loginUser;
export default {
	components: {
		qrcode
	},
	data() {
		return {
			loginUser: loginUser,
			TabCur: 0,
			scrollLeft: 0,
			username: loginUser.username,
			ilink: this.appUrl + '/#/pages/auth/register/register?ruid='+loginUser.userId,
			qrsize: 180,

			problem1: -1,
			problem2: -1,
			picker: problemBank,
			form: {
				phone: '',
				username: '', //需要自动鉴别是手机号还是用户名.
				password: '',
				exchangePassword: '',
				reexchangePassword: '',
				code: '',
				sessionId: '',
				recommendedUserId: 0,
				recommendedUser: {},
				problem1: '',
				problem2: '',
				answer1: '',
				answer2: ''
			},
			imgCode: '',
			imgCodeTime: 0
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		onCopyResult(res) {
			console.log('拷贝成功: ' + res);
			uni.showToast({
				title: '复制成功',
				icon: 'success',
				position: 'top',
			});
		},
		creatQrcode() {
			if (!this.ilink) {
				uni.showToast({
					title: '请输入二维码内容',
					icon: 'none'
				});
				return;
			}
			this.$refs.qrcode.creatQrcode();
		},
		clearQrcode() {
			this.$refs.qrcode.clearQrcode();
			this.clearIcon();
		},
		PickerChange1(e) {
			this.problem1 = e.detail.value;
			this.form.problem1 = this.picker[this.problem1];
		},
		PickerChange2(e) {
			this.problem2 = e.detail.value;
			this.form.problem2 = this.picker[this.problem2];
		},
		refreshCode() {
			this.form.sessionId = this.serial(8, 6, '__SESSION_ID__');
			this.imgCode = this.appHost + '/api/captcha?sessionId=' + this.form.sessionId;
			this.imgCodeTime = new Date().getTime();
		},
		doReg() {
			if (new Date().getTime() - this.imgCodeTime > 3 * 60 * 1000) {
				uni.showModal({
					title: '系统提示',
					content: '验证码已过期, 请重新输入',
					showCancel: true,
					confirmText: '确定',
					success: (confirm, cancel) => {
						if (confirm) {
							this.refreshCode();
						}
					}
				});
			} else {
				if (this.isBlank(this.form.recommendedUserId) || isNaN(this.form.recommendedUserId) || parseInt(this.form.recommendedUserId) <= 0) {
					this.showTip({ content: '非法推荐人' });
					return false;
				}
				if (this.isBlank(this.form.phone)) {
					this.showTip({ content: '请填写手机号' });
					return false;
				}
				if (this.isBlank(this.form.username)) {
					this.showTip({ content: '请填写用户名' });
					return false;
				}
				if (this.isBlank(this.form.password)) {
					this.showTip({ content: '请填写登录密码' });
					return false;
				}
				if (this.isBlank(this.form.exchangePassword)) {
					this.showTip({ content: '请填写交易密码' });
					return false;
				}
				if (this.isBlank(this.form.code)) {
					this.showTip({ content: '请填写验证码' });
					return false;
				}
				if (this.isBlank(this.form.problem1)) {
					this.showTip({ content: '请选择安全问题 1' });
					return false;
				}
				if (this.isBlank(this.form.answer1)) {
					this.showTip({ content: '请输入安全问题 1 答案' });
					return false;
				}
				if (this.isBlank(this.form.problem2)) {
					this.showTip({ content: '请选择安全问题 2' });
					return false;
				}
				if (this.isBlank(this.form.answer2)) {
					this.showTip({ content: '请输入安全问题 2 答案' });
					return false;
				}
				if (this.form.problem1 === this.form.problem2) {
					this.showTip({ content: '安全问题不能重复' });
					return false;
				}
				if (this.validator.reg(this.form)) {
					apiReg(this.form, res => {
						uni.showModal({
							title: '系统提示',
							content: '注册成功, 是否转向登录',
							cancelText: '否',
							confirmText: '是',
							success: (confirm, cancel) => {
								if (confirm) {
									this.goLogin();
								}
							}
						});
					});
				}
			}
		}
	},
	mounted() {
		this.creatQrcode();
		this.refreshCode();
		this.form.recommendedUserId = this.loginUser.userId;
		this.form.recommendedUser = this.loginUser;
	}
};
</script>

<style>
page,
.page {
	height: 100%;
}

.zxx-ilink {
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
}

.clip-btn {
	width: 250upx;
}

.submit-btn {
	width: 100%;
}

.share-link {
	width: 100%;
	height: calc(100% - 160upx);
	background-image: url('/static/design/bg-login.jpg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	text-align: center;
}

.share-link .img-top {
	width: 80%;
}

.cu-form-group uni-picker {
	background: #f2f5f6;
	color: #666;
	font-size: 20px;
	padding: 5px 12px;
	height: 60upx;
	line-height: 70upx;
	border-radius: 5px;
}

.cu-form-group uni-picker .picker {
	line-height: 55upx;
	text-align: left;
	color: #777;
}

.cu-form-group uni-picker::after {
	font-family: cuIcon;
	display: block;
	content: '\E6A3';
	position: absolute;
	font-size: 20px;
	color: #8799a3;
	line-height: 75upx;
	width: 43px;
	text-align: center;
	top: 0;
	bottom: 0;
	right: 5px;
	margin: auto;
}

.cu-capsule {
	margin-left: 20upx;
}
.cu-capsule,
.cu-capsule .cu-tag {
	height: 80upx;
}

.login-logo {
	text-align: center;
}

.login-logo img {
	width: 100upx;
	height: 100upx;
	border-radius: 50upx;
}

.login-btn {
	padding: 10upx 20upx;
	margin-top: 1350upx;
	padding-bottom: 200upx;
}

.verify-left {
	width: calc(100% - 260upx);
}
.verify-right {
	padding-left: 20upx;
}
.verify-btn {
	height: 80upx;
	line-height: 80upx;
	font-size: 28upx;
	width: 240upx;
	border-radius: 8upx;
	/* background: linear-gradient(left,#FF978D, #FFBB69); */
}
.verify-left,
.verify-right {
	float: left;
}

.landing {
	height: 84upx;
	line-height: 84upx;
	border-radius: 44upx;
	font-size: 32upx;
	/* background: linear-gradient(left, #ff978d, #ffbb69); */
	/* background: linear-gradient(to right, #263bb6, #bd3ed9); */
	background: linear-gradient(45deg, #0081ff, #1cbbb4);
	color: #fff;
}
.login-function {
	overflow: auto;
	padding: 30upx 20upx;
}
.login-forget {
	float: left;
	font-size: 26upx;
	color: #999;
}
.login-register {
	color: #666;
	float: right;
	font-size: 26upx;
}
.login-input {
	color: #666;
}
.login-input input {
	background: #f2f5f6;
	font-size: 28upx;
	padding: 10upx 25upx;
	height: 80upx;
	line-height: 62upx;
	border-radius: 8upx;
}
.login-margin-b {
	margin-bottom: 25upx;
}
.login-input {
	padding: 10upx 20upx;
}
.login-head {
	font-size: 34upx;
	text-align: center;
	padding: 25upx 10upx 55upx 10upx;
	color: #000;
}
.login-card {
	background: #fff;
	border-radius: 12upx;
	padding: 10upx 25upx;
	box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
	position: relative;
	/* margin-top: 120upx; */
}
.login-bg {
	height: 260upx;
	padding: 25upx;
	/* background: linear-gradient(#FF978D, #FFBB69); */
}
</style>
