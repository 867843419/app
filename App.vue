<script>
import Vue from 'vue';
export default {
	onLaunch: function() {
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif

				// #ifdef MP-WEIXIN || MP-QQ
				Vue.prototype.StatusBar = e.statusBarHeight;
				let capsule = wx.getMenuButtonBoundingClientRect();
				if (capsule) {
					Vue.prototype.Custom = capsule;
					// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
					Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				}
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});

		Vue.prototype.showTip = function(t) {
			console.log(t);
			uni.showModal({
				title: t.title ? t.title : '系统提示',
				content: t.content.length <= 40 ? t.content : '远程服务器异常, 请联系平台客服!',
				showCancel: false,
				confirmText: '确定',
				success: function(confirm, cancel) {
					if (confirm) {
						if (typeof t.callback === 'function') {
							t.callback(confirm, cancel);
						}
					}
				}
			});
		};

		// 获取当前页参: getCurrentPages()  传入即可.
		Vue.prototype.getCurPage = function(pages) {
			console.log(pages);
			let curPage = pages[pages.length - 1];
			return {
				route: curPage,
				param: curPage.options || curPage.$route.query //在微信小程序或是app中，通过curPage.options；如果是H5，则需要curPage.$route.query（H5中的curPage.options为undefined，所以刚好就不需要条件编译了）
			};
		};
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onError: function(res) {
		console.error(res);
	}
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import 'colorui/animation.css';

.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0px 40upx 0px;
	justify-content: space-between;
}

.nav-li {
	padding: 30upx;
	border-radius: 12upx;
	width: 45%;
	margin: 0 2.5% 40upx;
	background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;
}

.nav-li::after {
	content: '';
	position: absolute;
	z-index: -1;
	background-color: inherit;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: -10%;
	border-radius: 10upx;
	opacity: 0.2;
	transform: scale(0.9, 0.9);
}

.nav-li.cur {
	color: #fff;
	background: rgb(94, 185, 94);
	box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
}

.nav-title {
	font-size: 32upx;
	font-weight: 300;
}

.nav-title::first-letter {
	font-size: 40upx;
	margin-right: 4upx;
}

.nav-name {
	font-size: 28upx;
	text-transform: Capitalize;
	margin-top: 20upx;
	position: relative;
}

.nav-name::before {
	content: '';
	position: absolute;
	display: block;
	width: 40upx;
	height: 6upx;
	background: #fff;
	bottom: 0;
	right: 0;
	opacity: 0.5;
}

.nav-name::after {
	content: '';
	position: absolute;
	display: block;
	width: 100upx;
	height: 1px;
	background: #fff;
	bottom: 0;
	right: 40upx;
	opacity: 0.3;
}

.nav-name::first-letter {
	font-weight: bold;
	font-size: 36upx;
	margin-right: 1px;
}

.nav-li text {
	position: absolute;
	right: 30upx;
	top: 30upx;
	font-size: 52upx;
	width: 60upx;
	height: 60upx;
	text-align: center;
	line-height: 60upx;
}

.text-light {
	font-weight: 300;
}

@keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}

@-webkit-keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}

.cu-modal {
	position: absolite;
	z-index: 998;
}

uni-modal .uni-modal__title {
	font-weight: 500;
}

uni-modal .uni-modal__bd {
	color: #000;
}

.bg-btn {
	color: #fff;
	/* background-image: linear-gradient(45deg, #0081ff, #1cbbb4); */
	background-image: linear-gradient(45deg, #39b54a, #8dc63f);
}

.bg-custom{
	color: rgb(76, 29, 8);
	background-image: linear-gradient(45deg, rgb(183,132,48), rgb(236, 206, 86), rgb(183,132,48));
}

.bg-none {
	background: none;
}
</style>
