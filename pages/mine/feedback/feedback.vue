<template>
	<view class="page animation-slide-right">
		<cu-custom ref="nav" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">问题反馈</block>
		</cu-custom>
		<view class="feedback-title animation-fade">
			<text>问题和意见</text>
			<text class="feedback-quick" @tap="chooseMsg">快速键入</text>
		</view>
		<view class="feedback-body animation-fade"><textarea placeholder="请详细描述你的问题和意见..." v-model="feedback.content" class="feedback-textare" /></view>
		<!-- <view class='feedback-title animation-fade'>
            <text>图片(选填,提供问题截图,总大小10M以下)</text>
        </view>
        <view class="feedback-body feedback-uploader animation-fade">
            <view class="uni-uploader">
                <view class="uni-uploader-head">
                    <view class="uni-uploader-title">点击预览图片</view>
                    <view class="uni-uploader-info">{{imageList.length}}/8</view>
                </view>
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files">
                        <block v-for="(image,index) in imageList" :key="index">
                            <view class="uni-uploader__file" style="position: relative;">
                                <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
                                <view class="close-view" @click="close(index)">x</view>
                            </view>
                        </block>
                        <view class="uni-uploader__input-box" v-show="imageList.length < 8">
                        	<view class="uni-uploader__input" @tap="chooseImg"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view> -->
		<!-- <view class='feedback-title animation-fade'>
            <text>QQ/邮箱</text>
        </view>
        <view class="feedback-body cu-form-group animation-fade">
            <input class="feedback-input" v-model="feedback.contact" placeholder="(选填,方便我们联系你 )" />
        </view>
        <view class='feedback-title feedback-star-view animation-fade'>
            <text>体验评分</text>
            <view class="feedback-star-view">
                <text class="feedback-star" v-for="(value,key) in stars" :key="key" :class="key < feedback.score ? 'active' : ''" @tap="chooseStar(value)"></text>
            </view>
        </view> -->
		<view class="padding-xl">
			<button class="cu-btn block bg-custom margin-tb-sm lg" @click="send">
				<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text>
				确认提交
			</button>
		</view>
	</view>
</template>

<script>
import {justUser} from '@/api/index.js';
import { apiFeedback } from '@/api/system.js';
export default {
	data() {
		return {
			loginUser: justUser().loginUser,
			submiting: false,
			msgContents: ['界面显示错乱', '启动缓慢，卡出翔了', 'UI无法直视，丑哭了', '偶发性崩溃'],
			// stars: [1, 2, 3, 4, 5],
			// imageList: [],
			feedback: {
				// score: 0,
				content: ''
				// contact: ""
			}
		};
	},
	onLoad() {},
	methods: {
		// close(e){
		//     this.imageList.splice(e,1);
		// },
		// chooseImg() { //选择图片
		//     uni.chooseImage({
		//         sourceType: ["camera", "album"],
		//         sizeType: "compressed",
		//         count: 8 - this.imageList.length,
		//         success: (res) => {
		//             this.imageList = this.imageList.concat(res.tempFilePaths);
		//         }
		//     })
		// },
		// chooseStar(e) { //点击评星
		//     this.feedback.score = e;
		// },
		// previewImage() { //预览图片
		//     uni.previewImage({
		//         urls: this.imageList
		//     });
		// },
		chooseMsg() {
			//快速输入
			uni.showActionSheet({
				itemList: this.msgContents,
				success: res => {
					this.feedback.content = this.msgContents[res.tapIndex];
				}
			});
		},
		send() {
			if (!this.submiting) {
				if (this.isBlank(this.feedback.content)) {
					this.showTip({ content: '请输入反馈内容' });
					return false;
				}
				this.submiting = true;
				apiFeedback(
					this.feedback.content,
					res => {
						uni.showToast({
							title: '反馈成功',
							icon: 'success',
							position: 'top',
							complete: () => {
								this.submiting = false;
								setTimeout(() => {
									this.$refs.nav.BackPage();
								}, 1500);
							}
						});
					},
					() => {
						this.submiting = false;
					}
				);
			}
		}
	}
};
</script>

<style>
@font-face {
	font-family: uniicons;
	font-weight: normal;
	font-style: normal;
	src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
}
page {
	/* background-color: #EFEFF4; */
}
view {
	font-size: 28upx;
}
.input-view {
	font-size: 28upx;
}
.close-view {
	text-align: center;
	line-height: 14px;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	background: #ff5053;
	color: #ffffff;
	position: absolute;
	top: -6px;
	right: -4px;
	font-size: 12px;
}
/* 上传 */
.uni-uploader {
	flex: 1;
	flex-direction: column;
}
.uni-uploader-head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.uni-uploader-info {
	color: #b2b2b2;
}
.uni-uploader-body {
	margin-top: 16upx;
}
.uni-uploader__files {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.uni-uploader__file {
	margin: 10upx;
	width: 210upx;
	height: 210upx;
}
.uni-uploader__img {
	display: block;
	width: 210upx;
	height: 210upx;
}
.uni-uploader__input-box {
	position: relative;
	margin: 10upx;
	width: 208upx;
	height: 208upx;
	border: 2upx solid #d9d9d9;
}
.uni-uploader__input-box:before,
.uni-uploader__input-box:after {
	content: ' ';
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background-color: #d9d9d9;
}
.uni-uploader__input-box:before {
	width: 4upx;
	height: 79upx;
}
.uni-uploader__input-box:after {
	width: 79upx;
	height: 4upx;
}
.uni-uploader__input-box:active {
	border-color: #999999;
}
.uni-uploader__input-box:active:before,
.uni-uploader__input-box:active:after {
	background-color: #999999;
}
.uni-uploader__input {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}

/*问题反馈*/
.feedback-title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20upx;
	color: #8f8f94;
	font-size: 28upx;
}
.feedback-star-view.feedback-title {
	justify-content: flex-start;
	margin: 0;
}
.feedback-quick {
	position: relative;
	padding-right: 40upx;
}
.feedback-quick:after {
	font-family: uniicons;
	font-size: 40upx;
	content: '\e581';
	position: absolute;
	right: 0;
	top: 50%;
	color: #bbb;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
.feedback-body {
	background: #fff;
}
.feedback-textare {
	height: 200upx;
	font-size: 28upx;
	line-height: 50upx;
	width: 100%;
	box-sizing: border-box;
	padding: 20upx 30upx 0;
}
.feedback-input {
	font-size: 28upx;
	height: 50upx;
	min-height: 50upx;
	/* padding: 15upx 20upx; */
	line-height: 50upx;
}
.feedback-uploader {
	padding: 22upx 20upx;
}
.feedback-star {
	font-family: uniicons;
	font-size: 40upx;
	margin-left: 6upx;
}
.feedback-star-view {
	margin-left: 20upx;
}
.feedback-star:after {
	content: '\e408';
}
.feedback-star.active {
	color: #ffb400;
}
.feedback-star.active:after {
	content: '\e438';
}
.feedback-submit {
	/* background: #007AFF; */
	color: #ffffff;
	margin: 20upx;
}
</style>
