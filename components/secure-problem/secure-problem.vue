<template>
	<view>
		<view class="cu-modal" :class="modalName !== null ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">安全问题</view>
					<view class="action" @tap="close"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="">
					<view class="login-card">
						<view class="login-input login-margin-b cu-form-group text-left"><input type="text" v-model="xproblem1" placeholder="安全问题 1" disabled /></view>
						<view class="login-input login-margin-b cu-form-group text-left"><input type="text" v-model="answer1" placeholder="1." /></view>
						<view class="login-input login-margin-b cu-form-group text-left"><input type="text" v-model="xproblem2" placeholder="安全问题 2" disabled /></view>
						<view class="login-input login-margin-b cu-form-group text-left"><input type="text" v-model="answer2" placeholder="2." /></view>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="close">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="submitSecure">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiSecureProblem, apiSecureAnswer } from '@/api/auth.js';
export default {
	data() {
		return {
			modalName: null,
			username: '',
			success: false,
			problem1: '',
			xproblem1: '',
			problem2: '',
			xproblem2: '',
			answer1: '',
			answer2: ''
		};
	},
	methods: {
		open(username, callback) {
			console.log('secure-problem: ' + username + callback);
			this.username = username;
			apiSecureProblem(
				{
					loginname: username
				},
				res => {
					this.modalName = 'secureProblemModal';
					this.problem1 = res.data.problem1;
					this.xproblem1 = '1.' + this.problem1;
					this.problem2 = res.data.problem2;
					this.xproblem2 = '2.' + this.problem2;
				},
				res => {
					this.$emit('complete', 400);
				}
			);
		},
		close(e) {
			this.$emit('cancel');
			this.modalName = null;
		},
		submitSecure() {
			if (this.isBlank(this.answer1)) {
				this.showTip({ content: '请回答安全密保问题 1' });
				return false;
			}
			if (this.isBlank(this.answer2)) {
				this.showTip({ content: '请回答安全密保问题 2' });
				return false;
			}
			apiSecureAnswer(
				{
					loginname: this.username,
					answer1: this.answer1,
					answer2: this.answer2
				},
				res => {
					this.success = true;
					setTimeout(() => {
						this.close();
					}, 1000);
				},
				res => {
					this.$emit('complete', this.success ? 250 : 520);
				}
			);
		}
	}
};
</script>

<style></style>
