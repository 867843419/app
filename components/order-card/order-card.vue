<template>
	<view>
		<view class="order-card">
			<div class="item-my-oli" style="position:relative;" v-if="!xswitch && orderType !== 'deliver'" @click="clickCard">
				<div class="top-my-oil">
					<span>{{ num1 }}</span>
					<span>{{ num3 }}</span>
					<span>{{ num2 }}</span>
				</div>
				<div class="box-my-oil">
					<div class="box-left">
						<p>{{ sign }}积分</p>
						<p>{{ point }}</p>
					</div>
					<div class="box-right">
						<p>红利收益</p>
						<div>
							<span>{{ income }}</span>
						</div>
					</div>
				</div>
				<p class="time">
					<span>{{ sign }}时间：</span>
					<span>{{ time }}</span>
				</p>
				<p class="status">
					<span>状态：</span>
					<span>{{ statusRes[status] ? statusRes[status] : ' 非法状态!' }}</span>
				</p>
				<div style="position: absolute;right: 30px;bottom: 30px;">
					<button class="cu-btn cuIcon bg-black" style="opacity: 0.5;"><text class="cuIcon-right"></text></button>
				</div>
			</div>
			<div
				class="item-my-oli"
				:style="'position:relative;' + (xswitch || orderType === 'deliver') ? 'border-bottom: 1px solid #ccc;' : ''"
				v-if="xswitch || orderType === 'deliver'"
				@click="clickCard"
			>
				<view class="flex solid-bottom justify-between" style="border-bottom: 1px solid #ccc;">
					<view class="margin-xs radius">{{ order.opNum ? order.opNum : 'invaild' }}</view>
					<view class="margin-xs radius">{{ time ? time : 'invaild' }}</view>
				</view>
				<view class="margin-xs padding-top">
					<text>已匹配{{ sign }}订单</text>
				</view>
				<view class="margin-xs text-lg">需要打款金额: {{ order.opMoney ? order.opMoney : 'invaild' }}</view>
				<view class="margin-xs text-lg">打款截止时间: {{ time ? time : 'invaild' }}</view>
				<view class="margin-xs margin-bottom-sm text-red" v-if="orderType !== 'deliver'">剩余打款时间: {{ remainTime ? remainTime : 'invaild' }}</view>
				<span v-else style="font-size: 14px;color: #ff0000;">{{ statusRes[status] ? statusRes[status] : ' 非法状态!' }}</span>
				<div style="position: absolute;right: 30px;bottom: 30px;">
					<button class="cu-btn cuIcon bg-black" style="opacity: 0.5;"><text class="cuIcon-right" style="transform: rotate(90deg);"></text></button>
				</div>
			</div>

			<!--  真正的下拉内容 -->
			<view class="item-my-detail animation-scale-down padding-top" v-if="xswitch">
				<view class="margin-xs">收款人: {{ order.remitVOS && order.remitVOS.username ? order.remitVOS.username : 'invaild' }}</view>
				<view class="margin-xs">收款人姓名: {{ order.remitVOS && order.remitVOS.realname ? order.remitVOS.realname : 'invaild' }}</view>
				<view class="margin-xs">收款人电话: {{ order.remitVOS && order.remitVOS.phone ? order.remitVOS.phone : 'invaild' }}</view>
				<view class="margin-xs">收款银行: {{ order.remitVOS && order.remitVOS.bankName ? order.remitVOS.bankName : 'invaild' }}</view>
				<view class="margin-xs">收款卡号: {{ order.remitVOS && order.remitVOS.bankNum ? order.remitVOS.bankNum : 'invaild' }}</view>
				<view class="margin-xs">支行信息: {{ order.remitVOS && order.remitVOS.bankBranch ? order.remitVOS.bankBranch : 'invaild' }}</view>
				<view class="margin-xs">微信: {{ order.remitVOS && order.remitVOS.wechat ? order.remitVOS.wechat : 'invaild' }}</view>
				<view class="margin-xs">支付宝: {{ order.remitVOS && order.remitVOS.alipayNum ? order.remitVOS.alipayNum : 'invaild' }}</view>
				<view class="margin-xs">
					打款凭证:
					<view class="receipt padding-top">
						<view class="grid col-4 grid-square flex-sub">
							<view
								class="bg-img"
								@tap="ViewImage"
								:data-url="order.remitVOS.alipayFileUri"
								v-if="order.remitVOS && order.remitVOS.alipayFileUri && isNotBlank(order.remitVOS.alipayFileUri)"
							>
								<image :src="order.remitVOS.alipayFileUri" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg"><text class="cuIcon-close"></text></view>
							</view>
							<view class="solids" @tap="ChooseImage" v-else><text class="cuIcon-cameraadd"></text></view>
						</view>
					</view>
				</view>
				<view class="margin-xs padding-top text-right"><text class="text-sm text-red" @click="JB" :data-id="order.opId">举报此订单</text></view>
				<view class="margin-xs">
					<button class="cu-btn block line-orange margin-tb-sm lg" @click="submitDQ">
						<text v-if="dking" class="cuIcon-loading2 cuIconfont-spin"></text>
						确认打款
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { uploader } from '@/api/index.js';
import { apiGetOrderDetailUnwind, apiGetOrderDetailOpen, apiReport } from '@/api/deal.js';
export default {
	props: {
		num1: {
			type: Number | String,
			default: ''
		},
		num2: {
			type: Number | String,
			default: ''
		},
		num3: {
			type: Number | String,
			default: ''
		},
		point: {
			type: Number | String,
			default: ''
		},
		income: {
			type: Number | String,
			default: ''
		},
		time: {
			type: String,
			default: ''
		},
		orderId: {
			type: Number | String,
			default: ''
		},
		orderType: {
			type: String,
			default: ''
		},
		status: {
			type: Number | String,
			default: ''
		}
	},
	data() {
		return {
			statusRes: ['待匹配', '待打款', '待确认', '已完成', '被举报', '已过期'],
			xswitch: false,
			modalName: null,
			order: {},
			remainTime: '',
			remainIndex: null,
			alipayFileUri: '',
			dking: false,
			sign: '开仓'
		};
	},
	watch: {},
	mounted() {
		if (this.orderType === 'cover') {
			this.sign = '平仓';
		} else if (this.orderType === 'deliver') {
			this.sign = '交割';
		}
	},
	methods: {
		clickCard() {
			if (this.xswitch) {
				clearTimeout(this.remainIndex);
				this.xswitch = false;
				return false;
			}

			if (this.orderType === 'open') {
				apiGetOrderDetailOpen(this.orderId, res => {
					console.log(res);
					this.order = res.data;
					this.calcTime(this.order.opOverDate);
					this.xswitch = true;
				});
			} else if (this.orderType === 'cover') {
				apiGetOrderDetailUnwind(this.orderId, res => {
					console.log(res);
					this.order = res.data;
					this.calcTime(this.order.opOverDate);
					this.xswitch = true;
				});
			} else {
			}
		},
		submitDQ() {
			if (!this.order.remitVOS || this.isBlank(this.order.remitVOS.alipayFileUri)) {
				this.showTip({ content: '请上传打款凭证' });
				return false;
			}
			uni.showModal({
				title: '系统提示',
				content: '请确认已打款',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						uni.showToast({
							title: '确认成功',
							icon: 'success',
							position: 'top'
						});
					}
				}
			});
		},
		ChooseImage() {
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					console.log(res);
					const tempFilePaths = res.tempFilePaths;
					uploader({
						url: '/file/uploadFile',
						files: tempFilePaths[0],
						data: {
							filePurpose: 'alipayCert'
						},
						success: res => {
							this.order.remitVOS.alipayFileUri = res.data;
						}
					});
				}
			});
		},
		ViewImage(e) {
			this.modalName = 'ViewImage';
		},
		DelImg(e) {
			uni.showModal({
				title: '系统提示',
				content: '确定删除并重新上传吗？',
				cancelText: '取消',
				confirmText: '重新上传',
				success: res => {
					if (res.confirm) {
						this.order.remitVOS.alipayFileUri = '';
					}
				}
			});
		},
		JB(e) {
			uni.showModal({
				title: '系统提示',
				content: '请确认是否举报此订单',
				cancelText: '取消',
				confirmText: '确定',
				success: function(res) {
					if (res.confirm) {
						var id = e.currentTarget.dataset.id;
						apiReport(id, res => {
							uni.showToast({
								title: '举报成功',
								icon: 'success',
								position: 'top'
							});
						});
					}
				}
			});
		},
		// 计算剩余打款时间
		calcTime(date2) {
			if (!date2) {
				return 'invaild';
			}
			//注: 传入的是标准时间戳串
			var date_one = new Date().getTime();
			var date_two = new Date(Date.parse(date2.replace(/-/g, '/')));
			var date3 = Math.abs(date_two.getTime() - date_one.getTime()); //时间差的毫秒数[绝对值]
			//计算出相差年数
			var leave_3 = date3 % (24 * 3600 * 1000 * 365);
			var years = Math.floor(date3 / (24 * 3600 * 1000 * 365));
			//计算出相差月数
			var leave_2 = leave_3 % (24 * 3600 * 1000 * 365); //计算年数后剩余的毫秒数
			var months = Math.floor(leave_2 / (24 * 3600 * 1000 * 30));
			//计算出相差天数
			var leave_1 = leave_2 % (24 * 3600 * 1000 * 30); //计算月数后剩余的毫秒数
			var days = Math.floor(leave_1 / (24 * 3600 * 1000));
			//计算出小时数
			var leave1 = leave_1 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
			var hours = Math.floor(leave1 / (3600 * 1000));
			//计算相差分钟数
			var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
			var minutes = Math.floor(leave2 / (60 * 1000));
			//计算相差秒数
			var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
			var seconds = Math.round(leave3 / 1000);
			//计算相差毫秒数
			var leave4 = leave3 % 1000; //计算分钟数后剩余的毫秒数
			var minseconds = Math.round(leave4);
			this.remainTime = {
				bigger: date_two.getTime() > date_one.getTime() ? 2 : 1,
				years: years,
				months: months,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
				minseconds: minseconds,
				rseconds: date3,
				ifest:
					(years > 0 ? years + '年' : '') +
					(months > 0 ? months + '个月' : '') +
					(days > 0 ? days + '天' : '') +
					(hours > 0 ? hours + '小时' : '') +
					(minutes > 0 ? minutes + '分钟' : '') +
					(seconds > 0 ? seconds + '秒' : '') +
					(minseconds > 0 ? minseconds + '毫秒' : '')
			};
			this.remainIndex = setTimeout()(() => {
				this.calcTime(date2);
			}, 333);
		}
	}
};
</script>

<style>
.order-card {
	background-image: url('/static/order-card.png');
	background-size: 100% 100%;
	padding: 10px;
	color: #fff;
	border-radius: 5px;
	margin-bottom: 10px;
	overflow: hidden;
}
.top-my-oil {
	width: 100%;
	overflow: hidden;
	margin: 6px 0;
}
.box-my-oil {
	width: 100%;
	overflow: hidden;
	margin-bottom: 10px;
}

.item-my-oli {
	z-index: 666;
}

.item-my-detail {
	z-index: 660;
}

p {
	overflow: hidden;
}

.time,
.time span {
	font-size: 14px;
	color: #e4e4e4;
}

.status,
.status span {
	font-size: 14px;
	color: #ff0000;
}

.order-card p {
	color: #fff;
}

.top-my-oil span:nth-of-type(2) {
	float: right;
	border: 1px solid #fff;
	font-size: 12px;
	padding: 2px 10px;
	border-radius: 2px;
	line-height: 14px;
}

.top-my-oil span:nth-of-type(3) {
	float: right;
	border: 1px solid #fff;
	font-size: 12px;
	padding: 2px 10px;
	border-radius: 2px;
	margin-right: 4px;
	line-height: 14px;
}

.box-left,
.box-right {
	width: 50%;
	float: left;
}

.box-left p:nth-of-type(1),
.box-right p:nth-of-type(1) {
	font-size: 14px;
	margin: 4px 0;
	color: #e4e4e4;
}

.box-left p:nth-of-type(2),
.box-right p:nth-of-type(2) {
	margin: 4px 0;
	font-size: 20px;
}
</style>
