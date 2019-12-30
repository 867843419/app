<template>
	<view class="page animation-slide-right">
		<cu-custom :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">交易券记录</view>
		</cu-custom>
		<view>
			<view class="cu-list menu sm-border margin-top">
				<view class="cu-item" v-for="(item, index) in data" :key="index">
					<view class="content">
						<text :class="item.type === '1' ? 'text-green' : 'text-red'">{{ item.type === '1' ? '转入' : '转出' }}</text>
						<text class="text-grey margin-left-sm">数量:{{ item.count }}</text>
						<text class="text-grey margin-left-sm">余额:{{ item.lastCount }}</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ item.asCreateDate }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {justUser} from '@/api/index.js';
import { apiRecord } from '@/api/property.js';
export default {
	data() {
		return {
			loginUser: justUser().loginUser,
			data: []
		};
	},
	methods: {},
	mounted() {
		apiRecord(2, res => {
			this.data = res.data;
		});
	}
};
</script>

<style></style>
