/**
 * 校验规则
 */
export const regxp = {
	isNotBlank: str => {
		return (str && ((str + '').trim() !== '') && ((str + '').trim() !== 'null'));
	},
	isBlank: str => {
		return !regxp.isNotBlank(str);
	},
	isNotNull: str => {
		return (str && (str + '' !== '') && (str + '' !== 'null'));
	},
	isNull: str => {
		return !regxp.isNotNull(str);
	},
	isArray: obj => {
		return obj instanceof Array;
	},
	isPassword: str => {
		// return /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,20}$/.test(str); // 符合密码规则
		return str && str.length > 5 && str.length < 30;
	},
	isEmail: str => {
		return new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(str); // 符合密码规则
	},
	isMobile: str => {
		return /^[1][3,4,5,7,8][0-9]{9}$/.test(str);
	},
	isIdcard: str => {
		return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
	},
	isTag: str => {
		return /(^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$)/.test(str);
	},
	isInt: str => {
		return /^\+?[1-9]\d*$/.test(str);
	},
	hasChinese: str => {
		return /.*[\u4e00-\u9fa5]+.*$/.test(str); //含有汉字
	},
	hasEmoji: substring => { // 是否含有输入法编码的 Emoji 表情. 即 utf8mb4 code
		for (var i = 0; i < substring.length; i++) {
			var hs = substring.charCodeAt(i);
			if (0xd800 <= hs && hs <= 0xdbff) {
				if (substring.length > 1) {
					var ls = substring.charCodeAt(i + 1);
					var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
					if (0x1d000 <= uc && uc <= 0x1f77f) {
						return true;
					}
				}
			} else if (substring.length > 1) {
				var ls = substring.charCodeAt(i + 1);
				if (ls == 0x20e3) {
					return true;
				}
			} else {
				if (0x2100 <= hs && hs <= 0x27ff) {
					return true;
				} else if (0x2B05 <= hs && hs <= 0x2b07) {
					return true;
				} else if (0x2934 <= hs && hs <= 0x2935) {
					return true;
				} else if (0x3297 <= hs && hs <= 0x3299) {
					return true;
				} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
					hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
					hs == 0x2b50) {
					return true;
				}
			}
		}
		return false;
	},
	count: chars => { //统计包含汉字的字符的个数, 汉字占2个字符，非汉字占1个字符
		var sum = 0;
		for (var i = 0; i < chars.length; i++) {
			var c = chars.charCodeAt(i);
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
				sum++;
			} else {
				sum += 2;
			}
		}
		return sum;
	}
};
