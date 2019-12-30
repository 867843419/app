<template>
	<view>
		<view v-if="justParent.userId" class="cu-custom" :style="[{ height: CustomBar + 'px' }]" @click="returnParent">
			<view class="cu-bar fixed" :style="style">
				<view class="content" :style="[{ top: StatusBar + 'px' }]">返回我的账户</view>
			</view>
		</view>
		<view class="cu-custom" :style="[{ height: CustomBar + 'px' , top: StatusBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{ top: StatusBar + 'px' }]"><slot name="content"></slot></view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import {justParent} from '@/api/index.js';
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			justParent: justParent,
		};
	},
	name: 'cu-custom',
	computed: {
		style() {
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			var bgImage = this.bgImage;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			if (this.bgImage) {
				style = `${style}background-image:url(${bgImage});`;
			}
			return style;
		}
	},
	props: {
		bgColor: {
			type: String,
			default: ''
		},
		isBack: {
			type: [Boolean, String],
			default: false
		},
		backUri: {
			type: String,
			default: ''
		},
		bgImage: {
			type: String,
			default: 'https://image.weilanwl.com/color2.0/plugin/cjkz2329.jpg',//https://image.weilanwl.com/color2.0/index.jpg
		}
	},
	methods: {
		...mapMutations(['returnParent']),
		BackPage() {
			if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
				let url = '/' + __wxConfig.pages[0];
				return uni.redirectTo({ url });
			}
			if(getCurrentPages().length < 2){
				return uni.navigateTo({
					url: (this.backUri !== ''?this.backUri:'/')
				});
			}else{
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			}
		}
	}
};
</script>

<style></style>
