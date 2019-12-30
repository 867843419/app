<template name="components">
	<view class="page" style="background-image: url('/static/design/bg-1.jpg');background-repeat: no-repeat;background-attachment: fixed;background-position-y: bottom;">
		<cu-custom><block slot="content">行情</block></cu-custom>
		<view class="animation-scale-down" style="margin-top: -12upx;"><image src="/static/market/zc-bg.png" mode="widthFix" class="response"></image></view>
		<view class="margin-top-xs margin-bottom-xs">
			<view class="cu-list menu-avatar" @click="tip" v-for="(item, index) in data" :key="index" :style="[{ animation: 'show ' + ((index + 1) * 0.2 + 1) + 's 1' }]">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url(/static/market/avatar/' + item.pic + ');'"></view>
					<view class="content">
						<view class="text-black">{{ item.name }}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">{{ item.desc }}</view>
						</view>
					</view>
					<view class="action">
						<view class="text-black">${{ item.money }}</view>
					</view>
					<view class="action">
						<view :class="item.rate > 0 ? 'text-green' : 'text-red'">{{ item.rate > 0 ? '+' : '' }}{{ item.rate }}%</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
import {justUser} from '@/api/index.js';
export default {
	name: 'components',
	data() {
		return {
			loginUser: justUser().loginUser,
			data: [
				{
					name: 'OFB',
					desc: ' 欧非',
					money: 0.1,
					rate: +10.0,
					pic: 'ofb.png'
				},
				{
					name: 'BTC',
					desc: ' 比特币',
					money: 8108.0,
					rate: -1.01,
					pic: 'btc.png'
				},
				{
					name: 'ETH',
					desc: ' 以太坊',
					money: 175.75,
					rate: +0.47,
					pic: 'eth.png'
				},
				{
					name: 'LTC',
					desc: ' 莱特币',
					money: 55.01,
					rate: -0.11,
					pic: 'ltc.png'
				}
			]
		};
	},
	methods: {
		tip() {
			uni.showModal({
				title: '系统提示',
				content: '欧非交易所, 即将上线, 敬请期待!',
				showCancel: false,
				confirmText: '确定'
			});
		}
	}
};
</script>

<style>
.page{
	height: 100vh;
	background-image: url('/static/design/bg-1.jpg');
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position-y: bottom;
}

.cu-list.menu-avatar > .cu-item .content {
	width: calc(100% - 70px - 43px - 87px - 14px - 73px - 43px);
}

.cu-list.menu-avatar > .cu-item .action {
	margin: 0 30px;
}
</style>
