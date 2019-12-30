<template>
	<view class="page animation-slide-right">
		<cu-custom :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">市场收益记录</view>
		</cu-custom>
		<view>
			<view class="cu-list menu sm-border margin-top">
				<view class="cu-item">
					<view class="content">
						<text class="text-green">获得</text>
						<text class="text-grey margin-left-sm">数量:1600</text>
						<text class="text-grey margin-left-sm">余额:20</text>
					</view>
					<view class="action"><text class="text-grey text-sm">2019-10-04 17:17:24</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {justUser} from '@/api/index.js';
export default {
	data() {
		return {
			loginUser: justUser().loginUser,
		};
	},
	methods: {}
};
</script>

<style></style>
