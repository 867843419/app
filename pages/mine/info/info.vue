<template>
	<view class="animation-slide-right">
		<cu-custom :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">修改个人资料</view>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="0 == TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="0">基础资料</view>
			<view class="cu-item" :class="1 == TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="1">修改密码</view>
			<view class="cu-item" :class="2 == TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="2">支付宝</view>
			<view class="cu-item" :class="3 == TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="3">银行卡</view>
			<view class="cu-item" :class="4== TabCur ? 'text-green cur' : ''" @tap="tabSelect" :data-id="4">实名信息</view>
		</scroll-view>
		<view v-if="0 == TabCur" class="">
			<form>
				<view class="cu-form-group margin-top" @click="showTip({content: '暂不支持修改头像!'})">
					<view class="title">头像</view>
					<view class="cu-avatar radius bg-gray round" :style="[{ backgroundImage:'url('+form.user.avatar+')' }]"></view>
				</view>
				<view class="cu-form-group margin-top text-right">
					<view class="title">用户名</view>
					<input type="text" placeholder="请输入您的用户名" name="input" v-model="form.user.username" disabled></input>
				</view>
				<view class="cu-form-group text-right">
					<view class="title">推荐人</view>
					<input type="text" placeholder="请输入您的推荐人手机/用户名" name="input" v-model="form.referUser.username" disabled></input>
				</view>
				<view class="cu-form-group text-right">
					<view class="title">注册时间</view>
					<input type="text" placeholder="" name="createDate" :value="form.user.createDate" disabled></input>
				</view>
				<!-- <view class="cu-form-group margin-top text-right">
					<view class="title">期证钱包地址</view>
					<input type="url" placeholder="http://..." name="qzqbAddress" v-model="form.user.qzqbAddress"></input>
				</view>
				<view class="cu-form-group text-right">
					<view class="title">usdt地址</view>
					<input type="url" placeholder="http://..." name="usdtAddress" v-model="form.user.usdtAddress"></input>
				</view> -->
				<view class="cu-form-group margin-top">
					<view class="title">银行卡号</view>
					<input type="text" placeholder="请输入您的银行卡号" name="bankNum" v-model="form.user.bankNum" disabled @blur="form.bank.input = false" @focus="form.bank.input = true"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">银行类型</view>
					<view v-if="!form.bank.show && !form.bank.input && isNotBlank(form.user.bankNum)"><text class="cuIcon-info text-red text-bold"> 识别失败!</text> </view>
					<view v-if="!form.bank.show && form.bank.input && isNotBlank(form.user.bankNum)"><text class="cuIcon-loading2 cuIconfont-spin"></text> 正在识别...</view>
					<input v-if="form.bank.show" type="text" placeholder="请输入您的类型" name="bankType" v-model="form.user.bankType" readonly></input>
					<view v-if="form.bank.show" class="cu-capsule radius">
						<view class="cu-tag bg-blue">{{form.bank.cardType}}</view>
						<view class="cu-tag line-blue">{{form.bank.cardTypeName}}</view>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">开户名称</view>
					<input type="text" placeholder="请输入您的开户名" name="bankName" v-model="form.user.bankName" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">开户支行</view>
					<input type="text" placeholder="请输入您的开户支行" name="bankBranch" v-model="form.user.bankBranch" disabled></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">真实姓名</view>
					<input type="text" placeholder="请输入您的真实姓名" name="realname" v-model="form.user.realname" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input type="text" placeholder="请输入您的手机号码" name="phone" v-model="form.user.phone" disabled></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">支付宝</view>
					<input type="text" placeholder="请输入您的支付宝账户" name="alipayNum" v-model="form.user.alipayNum" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">收款码</view>
					<view class="receipt padding-top">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" :data-url="form.user.alipayFileUri" v-if="isNotBlank(form.user.alipayFileUri)">
								<image :src="form.user.alipayFileUri" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-form-group margin-top text-right">
					<view class="title">微信号</view>
					<input type="text" placeholder="请输入您的微信号" name="wechat" v-model="form.user.wechat"></input>
				</view>
				<view class="cu-form-group margin-top text-right">
					<view class="title">二级密码</view>
					<input type="password" placeholder="请设置您的二级密码" name="secondPassword" v-model="form.user.secondPassword"></input>
				</view>
			</form>
			<view class="cu-form-group margin-top bg-none">
				<button class="cu-btn block bg-green margin-tb-sm lg" @click="doSubmit">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 确认提交
				</button>
			</view>
		</view>
		<view v-if="1 == TabCur" class="">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">新的密码</view>
					<input type="password" placeholder="请输入您的新登录密码" name="newpassword" v-model="form.newpassword"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">确认密码</view>
					<input type="password" placeholder="请确认你的新登录密码" name="newrepassword" v-model="form.newrepassword"></input>
				</view>
			</form>
			<view class="cu-form-group margin-top bg-none">
				<button class="cu-btn block bg-green margin-tb-sm lg" @click="doSubmit">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 确认提交
				</button>
			</view>
		</view>
		<view v-if="2 == TabCur" class="">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">支付宝</view>
					<input type="text" placeholder="请输入您的支付宝账户" name="alipayNum" v-model="form.user.alipayNum"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">收款码</view>
					<view class="receipt padding-top">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" @tap="ViewImage" :data-url="form.user.alipayFileUri" v-if="isNotBlank(form.user.alipayFileUri)">
								<image :src="form.user.alipayFileUri" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-else>
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				</view>
			</form>
			<view class="cu-form-group margin-top bg-none">
				<button class="cu-btn block bg-green margin-tb-sm lg" @click="doSubmit">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 确认提交
				</button>
			</view>
		</view>
		<view v-if="3 == TabCur" class="">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">银行卡号</view>
					<input type="text" placeholder="请输入您的银行卡号" name="bankNum" v-model="form.user.bankNum" @blur="form.bank.input = false" @focus="form.bank.input = true"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">银行类型</view>
					<view v-if="!form.bank.show && !form.bank.input && isNotBlank(form.user.bankNum)"><text class="cuIcon-info text-red text-bold"> 识别失败!</text> </view>
					<view v-if="!form.bank.show && form.bank.input && isNotBlank(form.user.bankNum)"><text class="cuIcon-loading2 cuIconfont-spin"></text> 正在识别...</view>
					<input v-if="form.bank.show" type="text" placeholder="请输入您的类型" name="bankType" v-model="form.user.bankType" readonly></input>
					<view v-if="form.bank.show" class="cu-capsule radius">
						<view class="cu-tag bg-blue">{{form.bank.cardType}}</view>
						<view class="cu-tag line-blue">{{form.bank.cardTypeName}}</view>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">开户名称</view>
					<input type="text" placeholder="请输入您的开户名" name="bankName" v-model="form.user.bankName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">开户支行</view>
					<input type="text" placeholder="请输入您的开户支行" name="bankBranch" v-model="form.user.bankBranch"></input>
				</view>
			</form>
			<view class="cu-form-group margin-top bg-none">
				<button class="cu-btn block bg-green margin-tb-sm lg" @click="doSubmit">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 确认提交
				</button>
			</view>
		</view>
		<view v-if="4 == TabCur" class="">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">真实姓名</view>
					<input type="text" placeholder="请输入您的真实姓名" name="realname" v-model="form.user.realname"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input type="text" placeholder="请输入您的手机号码" name="phone" v-model="form.user.phone"></input>
				</view>
			</form>
			<view class="cu-form-group margin-top bg-none">
				<button class="cu-btn block bg-green margin-tb-sm lg" @click="doSubmit">
					<text v-if="submiting" class="cuIcon-loading2 cuIconfont-spin"></text> 确认提交
				</button>
			</view>
		</view>
		<view class="cu-modal" :class="(modalName !== null && form.user.alipayFileUri) ? 'show':''">
			<view class="cu-dialog">
				<view class="bg-img" :style="'background-image: url('+form.user.alipayFileUri+');height:200px;'">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {apiInfo} from '@/api/auth.js';
import {apiEditInfo} from '@/api/user.js';
import {uploader} from '@/api/index.js';
import {findBank} from '@/util/bank.js';
import {justUser} from '@/api/index.js';
let loginUser = justUser().loginUser;
export default {
	data() {
		return {
			loginUser: loginUser,
			modalName: null,
			submiting: false,
			TabArr: ['BASE','PASSWORD','ALI_PAY','BANK','REAL_NAME'],
			TabCur: 0,
			scrollLeft: 0,
			form: {
				type: 'BASE',
				bank: {
					input: false,
					show: false,
					bankCode: "",//银行代码
					bankName: "",//银行名称
					cardType: "",//卡类型代码
					cardTypeName: "",//卡类型名称
				},
				referUser: {username: ''},
				user: loginUser,
				newpassword: '',
				oldpassword: '',
			},
			imgList: [
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
			],
		};
	},
	computed:{
		formUserBankNum(){
			return this.form.user.bankNum;
		}
	},
	watch: {
		formUserBankNum(){
			this.getBank();
		}
	},
	created(){
		apiInfo({recommendedUserId: this.loginUser.referees}, res => {
			this.form.referUser = res.data;
		});
	},
	mounted(){
		this.getBank();
	},
	methods: {
		doSubmit(){
			if (!this.submiting) {
				if(this.validator.info(this.form)){
					this.submiting = true;
					apiEditInfo(
						this.form,
						res => {
							uni.showToast({
								title: '修改成功',
								icon: 'success',
								position: 'top',
								complete: () => {
									this.submiting = false;
								}
							});
						},
						() => {
							this.submiting = false;
						}
					);
				}
			}
		},
		getBank(){
			if(this.isNotBlank(this.form.user.bankNum)){
				var bankInfo = findBank((this.form.user.bankNum+'').trim(), res => {
					console.error(res);
				});
				if(bankInfo !== 'error'){
					this.form.user.bankType = bankInfo.bankName + ' [' + bankInfo.bankCode + ']';
					this.form.bank = bankInfo;
					this.form.bank.show = true;
					console.log(this.form.user.bankType);
				} else {
					this.form.bank.show = false;
					this.form.user.bankType = '';
				}
			}
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.form.type = this.TabArr[this.TabCur];
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		ChooseImage() {
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
					console.log(res);
					const tempFilePaths = res.tempFilePaths;
					uploader({
						url: '/file/uploadFile',
						file: tempFilePaths[0],
						data: {
							filePurpose: 'alipayImages',
						},
						success: res => {
							console.log(res);
							this.form.user.alipayFileUri = res.data;
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
						this.form.user.alipayFileUri = '';
					}
				}
			})
		},
		hideModal(e) {
			this.modalName = null
		},
	}
};
</script>

<style>
	page{
		/* background: #fff; */
	}
	
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	.cu-btn{
		width: 100%;
	}
	
	.receipt{
		width: 100%;
	}
	
	.receipt img{
		width: 400upx;
		/* height: 300upx; */
	}
	
	.cu-avatar{
		border-radius: 32upx;
	}
</style>
