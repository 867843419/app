<template>
	<view>
		<view class="cu-modal" :class="modalName !== null ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加子账户</view>
					<view class="action" @tap="close"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="">
					<view class="login-card">
						<view class="login-input login-margin-b cu-form-group text-left"><input type="text" v-model="form.loginname" placeholder="手机号/用户名" /></view>
						<view class="login-input login-margin-b cu-form-group text-left"><input type="password" v-model="form.password" placeholder="登录密码" /></view>
						<view class="login-input login-margin-b cu-form-group text-left">
							<view class="verify-left"><input type="text" placeholder="请输入验证码" v-model="form.code" /></view>
							<view class="verify-right"><img :src="imgCode" @click="refreshCode" class="verify-btn" alt="" /></view>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="close">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="submitCA">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiAddChildAccount } from '@/api/user.js';
export default {
	data() {
		return {
			modalName: null,
			imgCode: '',
			imgCodeTime: 0,
			success: false,
			form: {
				loginname: '',
				password: '',
				code: '',
				sessionId: ''
			}
		};
	},
	watch: {},
	methods: {
		refreshCode() {
			this.form.sessionId = this.serial(8, 6, '__SESSION_ID__');
			this.imgCode = this.appHost + '/api/captcha?sessionId=' + this.form.sessionId;
			this.imgCodeTime = new Date().getTime();
		},
		open() {
			this.modalName = 'addAccountModal';
			this.refreshCode();
		},
		close(e) {
			this.$emit('cancel');
			this.modalName = null;
			this.form = {
				loginname: '',
				password: '',
				code: '',
				sessionId: ''
			};
		},
		submitCA() {
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
					this.showTip({ content: '请填写子账户登录用户名或手机号' });
					return false;
				}
				if (this.isBlank(this.form.password)) {
					this.showTip({ content: '请填写子账户登录密码' });
					return false;
				}
				if (this.isBlank(this.form.code)) {
					this.showTip({ content: '请填写验证码' });
					return false;
				}
				apiAddChildAccount(
					this.form,
					res => {
						this.success = true;
					},
					res => {
						this.$emit('complete', this.success ? 250 : 520);
					}
				);
			}
		}
	}
};
</script>

<style>
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
</style>
