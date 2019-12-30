import {
	regxp
} from '@/validator/regxp.js';
const showTip = function(tip) {
	uni.showModal({
		title: '系统提示',
		content: tip,
		showCancel: false,
		confirmText: "确定"
	});
};


/**
 * 校验器： 建议全局引入
 */
export const validator = {

	deliver: form => {
		if (!regxp.isPassword(form.exchangePassword)) {
			showTip('交易密码长度最少 6 位, 最大 20 位');
			return false;
		}
		return true;
	},

	appoint: form => {
		console.log(form);
		if (regxp.isBlank(form.appointDay) || isNaN(form.appointDay) || form.appointDay >= 5) {
			showTip('开仓积分异常');
			return false;
		}
		if (!regxp.isPassword(form.exchangePassword)) {
			showTip('交易密码长度最少 6 位, 最大 20 位');
			return false;
		}
		return true;
	},

	property_activecode: form => {
		console.log(form);
		if (regxp.isBlank(form.activecodeCount) || isNaN(form.activecodeCount) || form.activecodeCount <= 0) {
			showTip('激活码数量不足');
			return false;
		}
		if (regxp.isBlank(form.activecodeConvert)) {
			showTip('请填写转让数量');
			return false;
		}
		if (isNaN(form.activecodeConvert) || form.activecodeConvert <= 0) {
			showTip('转让数量非法');
			return false;
		}
		if (form.targetUserId <= 0 || regxp.isBlank(form.targetUserCode)) {
			showTip('请指定目标账户');
			return false;
		}
		if (!regxp.isPassword(form.dealPassword)) {
			showTip('交易密码长度最少 6 位, 最大 20 位');
			return false;
		}
		return true;
	},

	property_stamp: form => {
		console.log(form);
		if (regxp.isBlank(form.propertyCount) || isNaN(form.propertyCount) || form.propertyCount <= 0) {
			showTip('交易券余额不足');
			return false;
		}
		if (regxp.isBlank(form.propertyConvert)) {
			showTip('请填写转让额度');
			return false;
		}
		if (isNaN(form.propertyConvert) || form.propertyConvert <= 0) {
			showTip('转让额度非法');
			return false;
		}
		if (form.targetUserId <= 0 || regxp.isBlank(form.targetUserCode)) {
			showTip('请指定目标账户');
			return false;
		}
		if (!regxp.isPassword(form.dealPassword)) {
			showTip('交易密码长度最少 6 位, 最大 20 位');
			return false;
		}
		return true;
	},

	property_honest: form => {
		console.log(form);
		if (regxp.isBlank(form.honestCount) || isNaN(form.honestCount) || form.honestCount <= 0) {
			showTip('诚信金余额不足');
			return false;
		}
		if (regxp.isBlank(form.honestCount)) {
			showTip('请填写兑换额度');
			return false;
		}
		if (isNaN(form.honestCount) || form.honestCount <= 0) {
			showTip('兑换额度非法');
			return false;
		}
		if (!regxp.isPassword(form.dealPassword)) {
			showTip('交易密码长度最少 6 位, 最大 20 位');
			return false;
		}
		return true;
	},

	info: form => {
		console.log(form);
		if (form.type === 'BASE') {
			var usernameCount = regxp.count(form.user.username);
			if (!regxp.isTag(form.user.username) || usernameCount <= 4 || usernameCount >= 16) {
				showTip('用户名只能含有汉字、数字、字母、下划线(不能以下划线开头和结尾, 长度最少 5 位, 最大 15 位, 其中一个汉字计两位)');
				return false;
			}
			if (regxp.isBlank(form.user.qzqbAddress)) {
				showTip('期证钱包地址不能为空');
				return false;
			}
			if (regxp.isBlank(form.user.usdtAddress)) {
				showTip('期证钱包地址不能为空');
				return false;
			}
			if (regxp.isBlank(form.user.wechat)) {
				showTip('微信号不能为空');
				return false;
			}
			if (regxp.isBlank(form.user.secondPassword)) {
				showTip('请填写二级密码');
				return false;
			}
			if (!regxp.isPassword(form.user.secondPassword)) {
				showTip('二级密码长度最少 6 位, 最大 20 位');
				return false;
			}
		} else if (form.type === 'PASSWORD') {
			if (regxp.isBlank(form.newpassword)) {
				showTip('请填写新密码');
				return false;
			}
			if (regxp.isBlank(form.newrepassword)) {
				showTip('请确认新密码');
				return false;
			}
			if (!regxp.isPassword(form.newpassword)) {
				showTip('密码长度最少 6 位, 最大 20 位');
				return false;
			}
			if (form.newpassword !== form.newrepassword) {
				showTip('两次输入的密码不一致');
				return false;
			}
		} else if (form.type === 'ALI_PAY') {
			if (regxp.isBlank(form.user.alipayNum)) {
				showTip('请填写支付宝账号');
				return false;
			}
			if (regxp.isBlank(form.user.alipayFileUri)) {
				showTip('请上传支付宝收款码');
				return false;
			}
		} else if (form.type === 'BANK') {
			if (regxp.isBlank(form.user.bankNum)) {
				showTip('请填写银行卡号');
				return false;
			}
			if (regxp.isBlank(form.user.bankType)) {
				showTip('请填写有效银行卡号, 以确认银行类型');
				return false;
			}
			if (regxp.isBlank(form.user.bankName)) {
				showTip('请填写银行卡开户名称');
				return false;
			}
			if (regxp.isBlank(form.user.bankBranch)) {
				showTip('请填写银行卡开户支行');
				return false;
			}
		} else if (form.type === 'REAL_NAME') {
			if (regxp.isBlank(form.user.realname)) {
				showTip('请填写真实姓名');
				return false;
			}
			if (!regxp.isMobile(form.user.phone)) {
				showTip('手机号码格式不正确');
				return false;
			}
		} else {
			showTip('非法参数: ' + form.type);
			return false;
		}
		return true;
	},

	reg: form => {
		console.log(form);
		if (!regxp.isMobile(form.phone)) {
			showTip('手机号码格式不正确');
			return false;
		}
		var usernameCount = regxp.count(form.username);
		if (!regxp.isTag(form.username) || usernameCount <= 4 || usernameCount >= 16) {
			showTip('用户名只能含有汉字、数字、字母、下划线(不能以下划线开头和结尾, 长度最少 5 位, 最大 15 位, 其中一个汉字计两位)');
			return false;
		}
		if (!regxp.isPassword(form.password)) {
			showTip('登录密码长度最少 6 位, 最大 20 位');
			return false;
		}
		if (form.password !== form.repassword) {
			showTip('两次输入的登录密码不一致');
			return false;
		}
		if (!regxp.isPassword(form.exchangePassword)) {
			showTip('交易密码长度最少 6 位, 最大 20 位');
			return false;
		}
		if (form.exchangePassword !== form.reexchangePassword) {
			showTip('两次输入的交易密码不一致');
			return false;
		}
		return true;
	},

	forgot: form => {
		console.log(form);
		if (form.password !== form.repassword) {
			showTip('两次输入的密码不一致');
			return false;
		}
		return true;
	},

	// 修改交易密码
	password_deal: form => {
		// form = JSON.parse(JSON.stringify(form));
		console.log(form);
		if (regxp.isBlank(form.exchangePassword) || regxp.isBlank(form.reexchangePassword)) {
			showTip('交易密码不能为空');
			return false;
		}
		if (form.exchangePassword !== form.reexchangePassword) {
			showTip('两次输入的密码不一致');
			return false;
		}
		if (!regxp.isPassword(form.exchangePassword)) {
			showTip('密码长度最少 6 位, 最大 20 位');
			return false;
		}
		return true;
	}

};
