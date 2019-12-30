<template name="basics">
	<view>
		<cu-custom><block slot="content">交易</block></cu-custom>
		<scroll-view scroll-y class="page">
			<!-- <swiper
				class="card-swiper animation-slide-right"
				:class="dotStyle ? 'square-dot' : 'round-dot'"
				:indicator-dots="true"
				:circular="true"
				:autoplay="true"
				interval="5000"
				duration="500"
				@change="cardSwiper"
				indicator-color="#8799a3"
				indicator-active-color="#0081ff"
			>
				<swiper-item v-for="(item, index) in swiperList" :key="index" :class="cardCur == index ? 'cur' : ''">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
					</view>
				</swiper-item>
			</swiper> -->
			<swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
				</swiper-item>
			</swiper>
			<view>
				<!-- <view class="zxx-userpanel block margin-top-sm margin-bottom">
					<view class="grid padding text-center col-3" style="line-height:70upx;">
						<view class="">{{ loginUser.username }}</view>
						<view class="">
							<view class="cu-avatar xl radius" :style="'width:70upx;height:70upx;border-radius:35upx;background-image:url(' + loginUser.avatar + ')'">
								<view class="cu-tag badge">V{{ loginUser.userLevel }}</view>
							</view>
						</view>
						<view class="">{{ loginUser.realname }}</view>
					</view>
				</view> -->
				<view class="zxx-btnpanel block margin-top padding grid col-3 text-center">
					<view><img src="/static/design/btn-appoint.png" class="shadow" alt="" @click="gotoPage" data-where="appoint" /></view>
					<view><img src="/static/design/btn-deliver.png" class="shadow" alt="" @click="gotoPage" data-where="deliver" /></view>
					<view><img src="/static/design/btn-grab.png" class="shadow" alt="" @click="gotoPage" data-where="grab" /></view>
				</view>
				<view class="zxx-sbtnpanel">
					<view class=" flex flex-direction text-center">
						<view class="padding"><img src="/static/design/btn-order-open.png" class="shadow" alt="" @click="gotoPage" data-where="order_open" /></view>
						<view class="padding"><img src="/static/design/btn-order-cover.png" class="shadow" alt="" @click="gotoPage" data-where="order_cover" /></view>
						<view class="padding"><img src="/static/design/btn-order-deliver.png" class="shadow" alt="" @click="gotoPage" data-where="order_deliver" /></view>
					</view>
				</view>
				<view class="zxx-quenepanel padding text-white" v-if="queneList && queneList.length >= 5">
					<view class="flex solid-bottom padding-bottom-xs justify-between">
						<view class="text-xs"></view>
						<view class="text-xs">
							当前有
							<text class="text-red margin-xs">{{ queneList.length }}</text>
							人正在排队
						</view>
					</view>
					<view class="grid text-sm text-center col-3">
						<view>账户</view>
						<view>等级</view>
						<view>申请时间</view>
					</view>
					<vue-seamless-scroll :data="queneList" :class-option="classOption" class="seamless-warp">
						<view class="grid text-sm text-center col-3" v-for="(item, index) in queneList" :key="index">
							<view>{{ item.username }}</view>
							<view>{{ item.userLevel ? 'VIP' + item.userLevel : 'invaild' }}</view>
							<view>{{ item.osCreateDate }}</view>
						</view>
					</vue-seamless-scroll>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
import {justUser} from '@/api/index.js';
import { apiQueneList } from '@/api/deal.js';
export default {
	name: 'deal',
	computed: {
		classOption() {
			return {
				direction: 1,
				hoverStop: true //鼠标悬停
				// singleHeight: 26, //单行停顿
				// waitTime:1000,//单行停顿时间（singleHeight，waitTime）
			};
		}
	},
	data() {
		return {
			loginUser: justUser().loginUser,
			queneList: [],
			cardCur: 0,
			dotStyle: false,
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: '/static/banner/1.png'
				},
				{
					id: 1,
					type: 'image',
					url: '/static/banner/2.png'
				},
				{
					id: 2,
					type: 'image',
					url: '/static/banner/3.png'
				}
			]
		};
	},
	methods: {
		DotStyle(e) {
			this.dotStyle = e.detail.value;
		},
		// cardSwiper
		cardSwiper(e) {
			this.cardCur = e.detail.current;
		},
		gotoPage(e) {
			var where = e.currentTarget.dataset.where;
			var which = e.currentTarget.dataset.which;
			if (where === 'grab') {
				if (!this.loginUser || !this.loginUser.userLevel || isNaN(this.loginUser.userLevel) || parseInt(this.loginUser.userLevel) <= 3) {
					this.showTip({ content: '您的等级不足 VIP3 级, 请升级到 3 级, 再进行抢单操作!' });
					return false;
				} else {
					this.showTip({ content: '抢单功能尚未开通, 请关注官方发布消息!' });
					return false;
				}
			}
			uni.navigateTo({
				url: '/pages/deal/' + where + '/' + (which ? which : where)
			});
		}
	},
	mounted() {
		apiQueneList(res => {
			this.queneList = res.data;
		});
	},
	onShow() {}
};
</script>

<style>
.page {
	height: 100vh;
	/* background: #fff; */
	background-image: url('/static/design/bg-login.jpg');
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: bottom;
}

.seamless-warp {
	height: 250upx;
	overflow: hidden;
}

.card-swiper uni-swiper-item {
	padding: 5px 0px 40px;
}

.zxx-sbtnpanel img {
	width: 60vw;
}

.zxx-btnpanel img {
	width: 25vw;
}

.zxx-userpanel {
	background: #302342;
	color: #fffc34;
}
</style>
