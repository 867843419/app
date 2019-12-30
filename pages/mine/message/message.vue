<template>
	<view class="animation-slide-right">
		<cu-custom :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">系统消息</view>
		</cu-custom>
		<view class="cu-timeline">
			<view class="cu-item text-green" @click="showDetail" :data-id="item.noticeId" v-for="(item, index) in data" :key="index">
				<view class="bg-gradual-green content shadow">
					<view class="cu-capsule radius">
						<view class="cu-tag text-white" :class="item.noticeType === 'NOTICE' ? ' bg-red' : 'bg-blue'">{{ item.noticeType === 'NOTICE' ? '公告' : '私信' }}</view>
						<view class="cu-tag line-white">{{ item.noticeCreateDate }}</view>
					</view>
					<view class="margin-top-sm text-content">
						<view class="m-title">{{ item.noticeTitle }}</view>
						<view class="m-summary">{{ item.summary }}...</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiMessageList } from '@/api/system.js';
import {justUser} from '@/api/index.js';
export default {
	data() {
		return {
			loginUser: justUser().loginUser,
			hide: false,
			data: []
		};
	},
	methods: {
		showDetail(e) {
			this.hide = true;
			uni.navigateTo({
				url: '/pages/mine/message/message_detail?id=' + e.currentTarget.dataset.id
			});
			this.hide = false;
		}
	},
	created() {
		apiMessageList(res => {
			this.data = res.data;
		});
	}
};
</script>

<style>
page {
	background: #fff;
}

.m-title {
}

.m-summary {
}
</style>
