<template name="components">
	<view>
		<cu-custom><block slot="content">资产</block></cu-custom>
		<view class="cu-card animation-scale-up">
			<view class="cu-item bg-img shadow-blur" :style="[{ backgroundImage: 'url(/static/property/jyz-top.png)' }]">
				<view class="cardTitle"></view>
				<view class="cardContext">
					<view class="flex p-xs mb-sm">
						<view class="flex-sub padding-sm margin-xs radius text-center" style="font-size: 28upx;font-weight: bold;" @click="gotoPage" data-where="record_assets">
							<view class="solid-bottom text-center">
								<text class="lg cuIcon-moneybag text-yellow margin-right-xs"></text>
								总资产
							</view>
							<view class="padding-xs text-center"><text class="padding text-yellow lg text-lg text-bold" style="font-size: 45upx;">0</text></view>
						</view>
						<view class="flex-sub padding-sm margin-xs radius text-center border" style="font-size: 28upx;font-weight: 400;">
							<view class="solid-bottom text-center">市场收益</view>
							<view class="padding-xs text-center"><text class="padding text-white lg text-lg text-bold" style="font-size: 45upx;font-weight: 300;">0</text></view>
						</view>
						<view class="flex-sub padding-sm margin-xs radius text-center" style="font-size: 28upx;font-weight: 400;">
							<view class="solid-bottom text-center">静态收益</view>
							<view class="padding-xs text-center"><text class="padding text-white lg text-lg text-bold" style="font-size: 45upx;font-weight: 300;">0</text></view>
						</view>
					</view>
					<view class="flex p-xs mb-sm">
						<view class="flex-sub padding-sm margin-xs radius text-center border" @click="gotoPage" data-where="record_stamp">
							<view class="solid-bottom">交易券</view>
							<view class="padding-xs text-center"><text class="padding text-white">0</text></view>
						</view>
						<view class="flex-sub padding-sm margin-xs radius text-center border" @click="gotoPage" data-where="record_activecode">
							<view class="solid-bottom">激活码</view>
							<view class="padding-xs text-center"><text class="padding text-white">0</text></view>
						</view>
						<view class="flex-sub padding-sm margin-xs radius text-center border" @click="gotoPage" data-where="record_honest">
							<view class="solid-bottom">诚信金</view>
							<view class="padding-xs text-center"><text class="padding text-white">0</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="zxx-btns-con animation-slide-bottom padding-xl">
			<view class="zxx-btns"><button class="round cu-btn block bg-custom lg shadow" @click="gotoPage" data-where="form_transfer_stamp">交易券转让</button></view>
			<view class="zxx-btns">
				<button class="zxx-btns round cu-btn block bg-custom margin-tb-sm lg shadow" @click="gotoPage" data-where="form_transfer_activecode">激活码转让</button>
			</view>
			<view class="zxx-btns">
				<button class="zxx-btns round cu-btn block bg-custom margin-tb-sm lg shadow" @click="gotoPage" data-where="form_convert_honest">诚信金兑换</button>
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
	methods: {
		gotoPage(e) {
			var where = e.currentTarget.dataset.where;
			var which = e.currentTarget.dataset.which;
			uni.navigateTo({
				url: '/pages/property/' + where + '/' + (which ? which : where)
			});
		}
	}
};
</script>

<style>
.page {
	height: 100vh;
}

.zxx-btns-con {
	border: 1px solid #3299fe;
	border-radius: 8px;
	margin: 0 30upx;
}

.zxx-btns button {
	width: 100%;
}

.cu-card > .cu-item {
	background: #000;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.cardContext {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	color: #fff;
	/* padding: 35upx; */
	font-size: 24upx;
	font-weight: 300;
	/* -webkit-transform: skew(-10deg, 0deg);
	-ms-transform: skew(-10deg, 0deg);
	transform: skew(-10deg, 0deg); */
	text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3);
}

.cardTitle {
	color: #fff;
	padding: 150upx 60upx;
	font-size: 40upx;
	font-weight: 300;
	transform: skew(-10deg, 0deg);
	position: relative;
	text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3);
}

.cardTitle::before {
	/* content: '';
	position: absolute;
	width: 60upx;
	height: 6upx;
	border-radius: 20upx;
	background-color: #fff;
	display: block;
	top: 60upx;
	left: 50upx;
	transform: skew(10deg, 0deg); */
}

.cardTitle::after {
	content: '';
	position: absolute;
	width: 140upx;
	border-radius: 6upx;
	height: 24upx;
	background-color: #fff;
	display: block;
	bottom: 76upx;
	left: 90upx;
	transform: skew(10deg, 0deg);
	opacity: 0.1;
}
</style>
