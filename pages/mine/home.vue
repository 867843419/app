<template>
	<view>
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg">
				<image :src="loginUser.avatar" class="png" mode="widthFix" @click="gotoPage" data-where="info"></image>
				<view class="margin-top-sm text-xl text-bold" @click="gotoPage" data-where="info">
					{{ loginUser.username }}
					<text class="text-df"></text>
				</view>
				<view class="margin-top-sm">
					<view class="cu-capsule">
						<view class="cu-tag bg-red"><text class="cuIcon-vip"></text></view>
						<view class="cu-tag line-red text-bold">{{ loginUser.userLevel ? loginUser.userLevel : 'invaild' }}</view>
					</view>
				</view>
				<image src="/static/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
			<!-- <view class="padding flex text-center text-grey bg-white shadow-warp">
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-orange">{{ visitTotal }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-attentionfill"></text>
						View
					</view>
				</view>
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-blue">{{ starCount }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-favorfill"></text>
						Star
					</view>
				</view>
				<view class="flex flex-sub flex-direction">
					<view class="text-xxl text-green">{{ forksCount }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-fork"></text>
						Fork
					</view>
				</view>
			</view> -->
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xs shadow-lg radius">
				<view class="cu-item arrow">
					<view class="content" @click="gotoPage" data-where="info">
						<text class="cuIcon-profile text-red"></text>
						<text class="text-grey">个人资料</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" @click="gotoPage" data-where="reg">
						<text class="cuIcon-friendfamous text-blue"></text>
						<text class="text-grey">邀请好友注册</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" @click="gotoPage" data-where="friend">
						<text class="cuIcon-friend text-orange"></text>
						<text class="text-grey">我的好友</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" @click="gotoPage" data-where="message">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">系统消息</text>
					</navigator>
				</view>
				<!-- <view class="cu-item arrow">
					<view class="content" @click="gotoPage" data-where="password_deal">
						<text class="cuIcon-lock text-red"></text>
						<text class="text-grey">忘记交易密码</text>
					</view>
				</view> -->
				<view class="cu-item arrow">
					<button class="cu-btn content" @click="gotoPage" data-where="feedback">
						<text class="cuIcon-edit text-cyan"></text>
						<text class="text-grey">问题反馈</text>
					</button>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" @click="gotoPage" data-where="about">
						<text class="cuIcon-info text-grey"></text>
						<text class="text-grey">关于</text>
					</button>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xs shadow-lg radius">
				<view class="cu-item arrow">
					<view class="content" @click="switchAccount">
						<text class="cuIcon-friendadd text-blue"></text>
						<text class="text-grey">切换账号</text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction"><button class="cu-btn bg-red margin-tb-sm lg" @click="doLogout">退出登录</button></view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<auth-filter ref="af"></auth-filter>
	</view>
</template>

<script>
import {justUser} from '@/api/index.js';
import authFilter from '@/components/auth-filter/auth-filter.vue';
export default {
	components: {
		authFilter,
	},
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
				url: '/pages/mine/' + where + '/' + (which ? which : where)
			});
		},
		doLogout() {
			this.$refs.af.logout();
		},
		switchAccount() {
			this.$emit('showDrawer');
		}
	}
};
</script>

<style>
.UCenter-bg {
	/* background-image: url(https://image.weilanwl.com/color2.0/index.jpg); */
	background-image: url('/static/p1.jpg');
	background-size: cover;
	height: 550rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	border-bottom: 1px solid #eee;
}

.UCenter-bg text {
	opacity: 0.8;
}

.UCenter-bg image {
	width: 200rpx;
	height: 200rpx;
}

.UCenter-bg .png {
	border-radius: 98rpx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

map,
.mapBox {
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

map,
.mapBox {
	width: 750rpx;
	height: 300rpx;
}
</style>
