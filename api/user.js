import {
	M,
	C,
	request
} from '@/api/index.js';

//code: 0/500
export const apiJustfyProblem = function() {
	request(M.POST, {
		url: '/user/checkout/answer',
		data: {
			answer1: '1',
			answer2: '1',
		},
		success: function(res) {},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
};

export const apiGetOneFriend = function(data, callback, completeCb) {
	var type = 'MOBILE';
	if (isNaN(data.loginname)) {
		type = 'USERNAME';
	}
	request(M.GET, {
		url: '/friendship/detail',
		data: {
			type: type,
			username: data.loginname,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
}

//获取子账户列表
export const apiChildAccounts = function(callback, completeCb) {
	request(M.POST, {
		url: '/user/account/list',
		data: {},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
};

//添加子账户列表
export const apiAddChildAccount = function(data, callback, completeCb) {
	var type = 'MOBILE';
	if (isNaN(data.loginname)) {
		type = 'USERNAME';
	}
	request(M.POST, {
		url: '/user/add/account',
		data: {
			type: type,
			username: data.loginname,
			password: data.password,
			code: data.code,
			sessionId: data.sessionId,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
};

// 删除子账户
export const apiDeleteChildAccount = function(userId, callback, completeCb) {
	request(M.POST, {
		url: '/user/remove/account',
		data: {
			zUserId: userId,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
};

// 切换子账户
export const apiSwitchChildAccount = function(userId, callback, completeCb) {
	request(M.POST, {
		url: '/user/cutover/account',
		data: {
			zUserId: userId,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
};

//回传数据同注册接口数据
export const apiEditInfo = function(data, callback, completeCb) {
	request(M.POST, {
		title: data.type === 'BASE' ? '基础资料修改' : (data.type === 'PASSWORD' ? '登录密码修改' : (data.type === 'ALI_PAY' ?
			'支付宝信息修改' : (data.type === 'BANK' ? '银行卡信息修改' : (data.type === 'REAL_NAME' ? '实名信息' : '资料修改')))),
		url: '/user/perfect/information',
		data: {
			type: data.type, //BASE,PASSWORD,ALI_PAY,BANK,REAL_NAME
			userId: data.user.userId,
			wechat: data.user.wechat,
			usdtAddress: data.user.usdtAddress,
			qzqbAddress: data.user.qzqbAddress,
			secondPassword: data.user.secondPassword,
			password: data.user.password,
			bankNum: data.user.bankNum,
			bankName: data.user.bankName,
			bankBranch: data.user.bankBranch,
			bankType: data.user.bankType,
			avatar: data.user.ravatar,
			alipayNum: data.user.alipayNum,
			alipayFileUri: data.user.alipayFileUri,
			realname: data.user.realname,
			phone: data.user.phone,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
};

export const apiEditPasswordDeal = function(exchangePassword, callback, completeCb) {
	request(M.POST, {
		url: '/user/perfect/information',
		data: {
			type: 'EXCHANGEPASW',
			exchangePassword: exchangePassword,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
};

// {msg: "操作成功", code: 0, data: Array(3)}
// code: 0
// data: Array(3)
// 0:
// avatar: null
// count: null
// lastCount: null
// type: null
// userId: 2
// userLevel: 1
// username: "狗蛋2号"
export const apiGetFriend = function(refUserId, callback) {
	request(M.GET, {
		url: '/friendship/list',
		data: {
			refUserId: refUserId,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
}

// {msg: "操作成功", code: 0, data: {…}}
// code: 0
// data:
// avatar: "1213414"
// count: null
// lastCount: null
// type: null
// userId: 1
// userLevel: 1
// username: "狗蛋"
export const apiGetParent = function(userId, callback) {
	request(M.GET, {
		url: '/friendship/referees',
		data: {
			refUserId: userId,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
}

//帮助激活.
export const apiHelpActive = function(userId2, callback) {
	request(M.POST, {
		url: '/user/invitation',
		data: {
			userId2: userId2,
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
}
