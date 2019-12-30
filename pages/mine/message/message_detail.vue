<template>
	<view class="animation-slide-right">
		<cu-custom :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">消息详情</view>
		</cu-custom>
		<view class="margin-xl bg-green padding-xl radius shadow-lg" style="padding-top: 20upx;">
			<view class="padding-bottom-xl text-left text-white">
				<text class="cuIcon-time"></text>
				<text class="margin-left-sm">{{ data.noticeCreateDate }}</text>
			</view>
			<view class="text-center margin-bottom text-lg  text-white">{{ data.noticeTitle }}</view>
			<view class="text-content" v-html="data.noticeContent"></view>
		</view>
	</view>
</template>

<script>
import { apiMessage } from '@/api/system.js';
import {justUser} from '@/api/index.js';
export default {
	data() {
		return {
			loginUser: justUser().loginUser,
			data: {}
		};
	},
	methods: {},
	onLoad(options) {
		console.log(options); //url 参数接收
		apiMessage(options.id, res => {
			this.data = res.data;
		});
	}
};
</script>

<style>
page {
}
</style>
