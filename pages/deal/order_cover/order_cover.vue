<template>
	<view class="page animation-slide-right">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">平仓订单</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="0 == TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="0">进行中</view>
				<view class="cu-item flex-sub" :class="1 == TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="1">已完成</view>
			</view>
		</scroll-view>
		<view class="padding">
			<template v-for="(item, index) in data">
				<order-card
					:key="index"
					v-if="1 == TabCur && item.opStatus + '' === 3"
					:num1="item.unMoney"
					:num2="item.unMoney * 0.2"
					:num3="item.unMoney * 0.8"
					:point="item.unScore"
					:income="item.unDividend"
					:time="item.unCreateDate"
					:status="item.unStatus"
					:orderId="item.unId"
					:orderType="'cover'"
				></order-card>
				<order-card
					:key="index"
					v-if="0 == TabCur && item.unStatus + '' !== 3"
					:num1="item.unMoney"
					:num2="item.unMoney * 0.2"
					:num3="item.unMoney * 0.8"
					:point="item.unScore"
					:income="item.unDividend"
					:time="item.unCreateDate"
					:status="item.unStatus"
					:orderId="item.unId"
					:orderType="'cover'"
				></order-card>
			</template>
		</view>
	</view>
</template>
<script>
import {justUser} from '@/api/index.js';
import { apiGetOrderUnwind, apiGetOrderDetailUnwind } from '@/api/deal.js';
import orderCard from '@/components/order-card/order-card.vue';
export default {
	components: {
		orderCard
	},
	data() {
		return {
			loginUser: justUser().loginUser,
			TabCur: 0,
			scrollLeft: 0,
			data: []
		};
	},
	created() {
		apiGetOrderUnwind(res => {
			this.data = res.data;
		});
	},
	mounted() {},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		}
	}
};
</script>

<style></style>
