<template>
	<view>
		<scroll-view scroll-y class="DrawerPage" :class="modalName !== null ? 'show' : ''">
			<deal v-if="PageCur == 'deal'" @toggleTab="toggleTab"></deal>
			<property v-if="PageCur == 'property'" @toggleTab="toggleTab"></property>
			<!-- <market v-if="PageCur == 'market'" @toggleTab="toggleTab"></market> -->
			<mine v-if="PageCur == 'mine'" @toggleTab="toggleTab" @showDrawer="showModal"></mine>
			<view class="cu-bar tabbar bg-black  shadow foot">
				<view class="action" @click="NavChange" data-cur="deal">
					<view class="cuIcon-cu-image"><image :src="'/static/tabbar/deal' + [PageCur == 'deal' ? '_cur' : ''] + '.png'"></image></view>
					<view :class="PageCur == 'deal' ? 'text-green' : 'text-gray'">交易</view>
				</view>
				<view class="action" @click="NavChange" data-cur="property">
					<view class="cuIcon-cu-image"><image :src="'/static/tabbar/property' + [PageCur == 'property' ? '_cur' : ''] + '.png'"></image></view>
					<view :class="PageCur == 'property' ? 'text-green' : 'text-gray'">资产</view>
				</view>
				<!-- <view class="action" @click="NavChange" data-cur="market">
					<view class="cuIcon-cu-image"><image :src="'/static/tabbar/market' + [PageCur == 'market' ? '_cur' : ''] + '.png'"></image></view>
					<view :class="PageCur == 'market' ? 'text-green' : 'text-gray'">行情</view>
				</view> -->
				<view class="action" @click="NavChange" data-cur="mine">
					<view class="cuIcon-cu-image"><image :src="'/static/tabbar/mine' + [PageCur == 'mine' ? '_cur' : ''] + '.png'"></image></view>
					<view :class="PageCur == 'mine' ? 'text-green' : 'text-gray'">我的</view>
				</view>
			</view>
		</scroll-view>
		<view class="DrawerClose" :class="modalName !== null ? 'show' : ''" @tap="hideModal"><text class="cuIcon-pullright"></text></view>
		<scroll-view scroll-y class="DrawerWindow" :class="modalName !== null ? 'show' : ''" v-if="PageCur == 'mine'">
			<view class="cu-list menu card-menu margin-top-sm margin-bottom-xl shadow-lg">
				<view class="add-account-view">
					<button class="margin add-account cu-btn block line-orange lg" style="border: 1px solid f1f1f1;" @click="reqAddAccount">
						<text class="cuIcon-add"></text>
						添加子账户
					</button>
				</view>
				<view v-if="caList.length <= 0" class="text-center text-grey text-sm" @click="reqAddAccount">暂无子账户, 点击添加</view>
				<view v-else class="cu-list menu-avatar">
					<view
						class="cu-item arrow"
						:class="touchAccountBox == 'move-box-' + index ? 'move-cur' : ''"
						v-for="(item, index) in caList"
						:key="index"
						:data-target="'move-box-' + index"
						@touchstart="ListTouchStart"
						@touchmove="ListTouchMove"
						@touchend="ListTouchEnd"
						@click="loginCA"
						:data-index="index"
					>
						<view class="cu-avatar round lg" :style="'background-image:url(' + genAvatar(item.username, item.avatar) + ');'">
							<view class="cu-tag badge">{{ item.userLevel }}</view>
						</view>
						<view class="content"><view class="text-grey">{{item.username}}</view></view>
						<view class="action">
							<view class="text-grey"><text class="cuIcon-right"></text></view>
						</view>
						<view class="move">
							<view class="bg-green" @click="loginCA" :data-id="item.userId">登录</view>
							<view class="bg-red" @click="deleteCA" :data-id="item.userId">删除</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<add-account ref="addAccount" @cancel="cancelAddAccount" @complete="completeAddAccount"></add-account>
		<auth-filter ref="af"></auth-filter>
	</view>
</template>

<script>
import authFilter from '@/components/auth-filter/auth-filter.vue';
import { apiChildAccounts, apiDeleteChildAccount, apiSwitchChildAccount } from '@/api/user.js';
import { generateAvatar } from '@/util/avatar.js';
import addAccount from '@/components/add-account/add-account.vue';
export default {
	components: {
		authFilter,
		addAccount
	},
	data() {
		return {
			PageCur: 'deal',
			hide: false,
			modalName: null,
			touchAccountBox: null,
			listTouchStart: 0,
			listTouchDirection: null,
			caList: []
		};
	},
	mounted(){
		this.$refs.af.filter();
	},
	methods: {
		NavChange: function(e) {
			this.$refs.af.filter(true);
			this.PageCur = e.currentTarget.dataset.cur;
		},
		toggleTab() {
			this.hide = !this.hide;
		},
		showModal(e) {
			apiChildAccounts(res => {
				console.log(res);
				this.caList = res.data;
				this.modalName = 'DrawerModal';
			});
		},
		hideModal(e) {
			this.modalName = null;
		},
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX;
		},
		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
		},
		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.touchAccountBox = e.currentTarget.dataset.target;
			} else {
				this.touchAccountBox = null;
			}
			this.listTouchDirection = null;
		},
		genAvatar(username, avatar) {
			return generateAvatar(username, avatar);
		},
		//添加子账户
		reqAddAccount() {
			this.$refs.addAccount.open();
		},
		cancelAddAccount() {},
		completeAddAccount(code) {
			if (code !== 520) {
				this.showTip({
					content: '子账户添加成功',
					callback: (confirm, cancel) => {
						if (confirm) {
							apiChildAccounts(res => {
								console.log(res);
								this.caList = res.data;
								this.$refs.addAccount.close();
							});
						}
					}
				});
			}
		},
		loginCA(e) {
			var id = e.currentTarget.dataset.id;
			apiSwitchChildAccount(id, res=>{
				this.loginChild(res.data);
			});
		},
		deleteCA(e) {
			var id = e.currentTarget.dataset.id;
			apiDeleteChildAccount(id, res=>{
				uni.showToast({
					title: '删除成功',
					icon: 'success',
					position: 'top',
					complete: () => {
						this.submiting = false;
						setTimeout(() => {
							apiChildAccounts(res => {
								console.log(res);
								this.caList = res.data;
							});
						}, 1500);
					}
				});
			});
		}
	}
};
</script>

<style>
page {
	width: 100vw;
	overflow: hidden;
}

/* .cu-list.menu-avatar > .cu-item,
.cu-list.menu-avatar > .cu-item:after,
.cu-list.menu > .cu-item:after {
	height: 100upx;
} */

.add-account-view {
	box-shadow: 10px 10px 5px 888888;
}

.add-account::after {
	border: none;
}

.DrawerPage {
	position: fixed;
	width: 100vw;
	height: 100vh;
	left: 0vw;
	background-color: #f1f1f1;
	transition: all 0.4s;
}

.DrawerPage.show {
	transform: scale(0.9, 0.9);
	left: 85vw;
	box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
	transform-origin: 0;
}

.DrawerWindow {
	position: absolute;
	width: 85vw;
	height: 100vh;
	left: 0;
	top: 0;
	transform: scale(0.9, 0.9) translateX(-100%);
	opacity: 0;
	pointer-events: none;
	transition: all 0.4s;
	/* padding: 100upx 0; */
	/* padding-top: 28upx; */
	/* padding-bottom: 100upx; */
}

.DrawerWindow.show {
	transform: scale(1, 1) translateX(0%);
	opacity: 1;
	pointer-events: all;
}

.DrawerClose {
	position: absolute;
	width: 40vw;
	height: 100vh;
	right: 0;
	top: 0;
	color: transparent;
	padding-bottom: 30upx;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
	letter-spacing: 5px;
	font-size: 50upx;
	opacity: 0;
	pointer-events: none;
	transition: all 0.4s;
}

.DrawerClose.show {
	opacity: 1;
	pointer-events: all;
	width: 15vw;
	color: #fff;
}

.DrawerPage .cu-bar.tabbar .action button.cuIcon {
	width: 64upx;
	height: 64upx;
	line-height: 64upx;
	margin: 0;
	display: inline-block;
}

.DrawerPage .cu-bar.tabbar .action .cu-avatar {
	margin: 0;
}

.DrawerPage .nav {
	flex: 1;
}

.DrawerPage .nav .cu-item.cur {
	border-bottom: 0;
	position: relative;
}

.DrawerPage .nav .cu-item.cur::after {
	content: '';
	width: 10upx;
	height: 10upx;
	background-color: currentColor;
	position: absolute;
	bottom: 10upx;
	border-radius: 10upx;
	left: 0;
	right: 0;
	margin: auto;
}

/* .DrawerPage .cu-bar.tabbar .action {
	flex: initial;
} */
</style>
