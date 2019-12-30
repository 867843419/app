<template>
	<view class="animation-slide-right">
		<cu-custom ref="nav" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">关于</view>
		</cu-custom>
		<view class="margin-xl bg-white padding-xl radius shadow-lg">
			<view class="text-center margin-bottom text-lg  text-grey">{{ aboutus.noticeTitle }}</view>
			<view class="text-content" v-html="aboutus.noticeContent"></view>
		</view>
	</view>
</template>

<script>
import {justUser} from '@/api/index.js';
import { apiAbout } from '@/api/system.js';
export default {
	data() {
		return {
			loginUser: justUser().loginUser,
			aboutus: {}
		};
	},
	methods: {},
	created() {
		apiAbout(res => {
			this.aboutus = res.data;
			//强制要求标题不能为空!
			if (!this.aboutus || this.isBlank(this.aboutus.noticeTitle)) {
				this.showTip({
					callback: () => {
						this.$refs.nav.BackPage();
					}
				});
			}
		});
	}
};
</script>

<style>
page {
}
</style>
