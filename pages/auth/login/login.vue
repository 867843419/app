<template>
	<view class="content page">
		<view class="login-bg bg-custom animation-slide-bottom">
			<view class="login-card">
				<view class="login-logo"><img src="/static/logo/login-logo.png" alt="" /></view>
				<view class="login-head">登录{{ appName }}</view>
				<view class="login-input login-margin-b"><input type="text" v-model="form.loginname" placeholder="手机号/用户名" /></view>
				<view class="login-input login-margin-b"><input type="password" v-model="form.password" placeholder="登录密码" /></view>
				<view class="login-input login-margin-b">
					<view class="verify-left"><input type="text" placeholder="请输入验证码" v-model="form.code" /></view>
					<view class="verify-right"><img :src="imgCode" @click="refreshCode" class="verify-btn" alt="" /></view>
				</view>
				<view class="login-function"><view class="login-register" @click="goForget">忘记密码? 去找回 ></view></view>
			</view>
		</view>
		<view class="login-btn animation-fade"><button class="landing bg-custom" type="primary" @click="doLogin">登录</button></view>
	</view>
</template>

<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { apiLogin } from '@/api/auth.js';
export default {
	data() {
		return {
			form: {
				loginname: '', //需要自动鉴别是手机号还是用户名.
				password: '',
				code: '',
				sessionId: ''
			},
			imgCode: '',
			imgCodeTime: 0
		};
	},
	onLoad() {
	},
	methods: {
		...mapMutations(['remove', 'login']),
		refreshCode() {
			this.form.sessionId = this.serial(8, 6, '__SESSION_ID__');
			this.imgCode = this.appHost + '/api/captcha?sessionId=' + this.form.sessionId;
			this.imgCodeTime = new Date().getTime();
		},
		doLogin() {
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
				if (this.isBlank(this.form.loginname)) {
					this.showTip({ content: '请填写登录用户名或手机号' });
					return false;
				}
				if (this.isBlank(this.form.password)) {
					this.showTip({ content: '请填写登录密码' });
					return false;
				}
				if (this.isBlank(this.form.code)) {
					this.showTip({ content: '请填写验证码' });
					return false;
				}
				apiLogin(this.form, res => {
					this.login(res.data);
				});
			}
		},
		goForget() {
			uni.navigateTo({
				url: '/pages/auth/forget/forget'
			});
		}
	},
	created() {
		this.refreshCode();
	},
	mounted() {
		// this.remove();
	}
};
</script>

<style>
page {
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
	margin-top: 600upx;
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
