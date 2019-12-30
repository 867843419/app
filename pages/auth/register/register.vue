<template>
	<scroll-view scroll-y class="content">
		<view class="login-bg bg-custom animation-slide-bottom">
			<view class="login-card">
				<view class="login-logo"><img src="/static/logo/login-logo.png" alt="" /></view>
				<view class="login-head">注册{{ appName }}</view>
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
				<view class="login-function"><view class="login-register" @click="goLogin">已有账号? 去登录 ></view></view>
			</view>
		</view>
		<view class="login-btn animation-fade"><button class="landing bg-custom" type="primary" @click="doReg">免费注册</button></view>
	</scroll-view>
</template>

<script>
import { apiReg, apiInfo } from '@/api/auth.js';
import { problemBank } from '@/util/problem.js';
export default {
	data() {
		return {
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
	onLoad(options) {
		console.log(options); //url 参数接收
		if (!options.ruid || isNaN(options.ruid || options.ruid <= 0)) {
			uni.showModal({
				title: '系统提示',
				content: '非法访问',
				showCancel: false,
				confirmText: '确定',
				success: (confirm, cancel) => {
					if (confirm) {
						this.goLogin();
					}
				}
			});
			return false;
		}
		this.form.recommendedUserId = options.ruid;
		apiInfo(this.form, res => {
			this.form.recommendedUser = res.data;
		});
	},
	methods: {
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
		},
		goLogin() {
			uni.navigateTo({
				url: '/pages/auth/login/login'
			});
		}
	},
	created() {
		this.refreshCode();
	},
	mounted() {}
};
</script>

<style>
.content {
	height: 100%;
	/* background: linear-gradient(45deg, #0081ff, #1cbbb4); */
	/* background-image: linear-gradient(45deg, #39b54a, #8dc63f); */
	color: #fff;
	height: 100vh;
	/* background: linear-gradient(45deg, #0081ff, #1cbbb4); */
	/* background-image: linear-gradient(45deg, #39b54a, #8dc63f); */
	color: #fff;
	height: 100vh;
	/* background: #fff; */
	background-image: url('/static/design/bg-login.jpg');
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: bottom;
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
	/* border-radius: 50upx; */
}

.login-btn {
	padding: 10upx 20upx;
	margin-top: 1500upx;
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
	margin-top: 120upx;
}
.login-bg {
	height: 260upx;
	padding: 25upx;
	/* background: linear-gradient(#FF978D, #FFBB69); */
}
</style>
