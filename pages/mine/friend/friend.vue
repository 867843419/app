<template>
	<view class="page animation-slide-right">
		<cu-custom :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">我的好友</view>
		</cu-custom>
		<view class="margin-top">
			<view class="margin-bottom-sm margin-left"><text class="text-grey">我的上级</text></view>
			<view class="cu-list menu-avatar margin-bottom">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url(' + genAvatar(parent.username, parent.avatar) + ');'">
						<view class="cu-tag badge">{{ parent.userLevel }}</view>
					</view>
					<view class="content">
						<view class="text-black">{{ parent.username }}</view>
					</view>
					<view class="action">
						<view class="text-black">{{ parent.phone }}</view>
					</view>
				</view>
			</view>
			<view class="margin-bottom-sm margin-left"><text class="text-grey">我的下级</text></view>
			<uni-collapse :accordion="true">
				<uni-collapse-item :show-animation="true" :padding="false" v-for="(item, index) in data" :key="index">
					<view slot="title">
						<view class="cu-list menu-avatar" @click="showChilds" :data-id="item.userId">
							<view class="cu-item">
								<view class="cu-avatar round lg" :style="'background-image:url(' + genAvatar(item.username, item.avatar) + ');'">
									<view class="cu-tag badge">{{ item.userLevel }}</view>
								</view>
								<view class="content">
									<view class="text-black">{{ item.username }}</view>
								</view>
								<view class="action">
									<view class="text-black">{{ item.phone }}</view>
								</view>
								<view class="action act-end" v-if="item.activeStatus !== 1"><view class="cu-btn round sm bg-blue" @click="helpActive" :data-id="item.userId">帮激活</view></view>
							</view>
						</view>
					</view>
					<view class="sec-list" v-if="aUserId > 0 && sedata.length > 0">
						<view class="cu-list menu-avatar" v-for="(itemc, indexc) in sedata" :key="indexc">
							<view class="cu-item">
								<view class="cu-avatar round lg" :style="'background-image:url(' + genAvatar(itemc.username, itemc.avatar) + ');'">
									<view class="cu-tag badge">{{ itemc.userLevel }}</view>
								</view>
								<view class="content secs">
									<view class="text-black">{{ itemc.username }}</view>
								</view>
								<view class="action">
									<view class="text-black">{{ itemc.phone }}</view>
								</view>
								<view class="action act-end" v-if="itemc.activeStatus !== 1"><view class="cu-btn round sm bg-blue" @click="helpActive" :data-id="itemc.userId">帮激活</view></view>
							</view>
						</view>
					</view>
					<view class="sec-list" v-else>
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg"><text class="cuIcon-info"></text></view>
								<view class="content secs"><view class="text-grey">暂无下级</view></view>
								<view class="action"><view class="text-black"></view></view>
								<view class="action act-end"><view class="cu-tag round sm bg-grey"></view></view>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
import Vue from 'vue';
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
import { generateAvatar } from '@/util/avatar.js';
import { apiGetFriend, apiGetParent, apiHelpActive } from '@/api/user.js';
import { justUser } from '@/api/index.js';
export default {
	components: {
		uniCollapse,
		uniCollapseItem
	},
	data() {
		return {
			loginUser: justUser().loginUser,
			parent: {},
			data: [],
			aUserId: 0,
			sedata: []
		};
	},
	methods: {
		init(){
			if (this.loginUser) {
				apiGetParent(this.loginUser.userId, res => {
					this.parent = res.data;
				});
				apiGetFriend(this.loginUser.userId, res => {
					this.data = res.data;
				});
			}
		},
		genAvatar(username, avatar) {
			return generateAvatar(username, avatar);
		},
		showChilds(e) {
			console.log(e);
			this.aUserId = e.currentTarget.dataset.id;
			apiGetFriend(this.aUserId, res => {
				this.sedata = res.data;
			});
		},
		helpActive(e){
			var uid = e.currentTarget.dataset.id;
			apiHelpActive(uid, res => {
				uni.showModal({
					title: "系统提示",
					content: '帮助激活成功',
					showCancel: false,
					confirmText: "确定",
					success: res => {
						this.init();
					}
				});
			});
		}
	},
	mounted() {
		this.init();
	}
};
</script>

<style>
.cu-item {
	padding: 0;
}

.cu-avatar.lg {
	width: 60upx;
	height: 60upx;
}

.cu-list.menu-avatar > .cu-item {
	padding: 20upx 0 20upx 20upx;
	height: 100upx;
}

.cu-list.menu-avatar > .cu-item .content {
	left: 100upx;
	width: calc(100% - 70px - 43px - 87px - 14px - 73px - 43px);
}

.cu-list.menu-avatar > .cu-item .content.secs {
	width: 100%;
}

.cu-list.menu-avatar > .cu-item .action {
	margin: 0 30px;
	margin-right: 100upx;
}

.cu-list.menu-avatar > .cu-item .action.act-end {
	margin: 0;
	margin-right: 20upx;
}

.sec-list .cu-item .cu-avatar {
	left: 80upx !important;
}

.sec-list .cu-item .content {
	left: 150upx !important;
}

.sec-list .cu-item .action.act-end {
	margin-right: 50upx !important;
	width: 120upx;
}
</style>
