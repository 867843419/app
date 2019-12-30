import {
	M,
	C,
	request
} from '@/api/index.js';

// {msg: "操作成功", code: 0, data: {…}}
// code: 0
// data:
// activeStatus: null
// alipayFileUri: null
// alipayNum: null
// answer1: ""
// answer2: ""
// avatar: null
// bankBranch: null
// bankName: null
// bankNum: null
// benefit: null
// createBy: null
// createDate: null,//这个是注册时间
// createTime: null
// credibleMoney: null
// exchangePassword: null
// invitationCode: null
// isDeny: null
// isSystem: null
// isValid: null
// params: {}
// password: "4RZLlC1cDdh0vVda+YKphQ=="
// phone: "110"
// point: null
// problem1: "123?"
// problem2: "456?"
// qzqbAddress: null
// realname: null
// referees: "0"
// remark: null
// searchValue: null
// secondPassword: null
// tradingVolume: null
// updateBy: null
// updateTime: null
// usdtAddress: null
// userId: null
// userLevel: null
// username: "lujiji"
// wechat: null
// __proto__: Object
// msg: "操作成功"
export const apiReg = function(data, callback, completeCb) {
	request(M.POST, {
		title: '注册',
		url: '/user/register',
		data: {
			username: data.username,
			phone: data.phone,
			password: data.password,
			exchangePassword: data.exchangePassword,
			recommendedUserId: data.recommendedUserId,
			problem1: data.problem1,
			problem2: data.problem2,
			answer1: data.answer1,
			answer2: data.answer2,
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

export const apiInfo = function(data, callback, completeCb) {
	request(M.GET, {
		title: '推荐人查询',
		url: '/user/info',
		data: {
			ruid: data.recommendedUserId,
		},
		success: res => {
			callback(res);
		},
		complete: res => {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	});
}

//回传参数同注册接口.
export const apiLogin = function(data, callback) {
	var type = 'MOBILE';
	if (isNaN(data.loginname)) {
		type = 'USERNAME';
	}
	request(M.POST, {
		title: '登录',
		url: '/user/login',
		data: {
			type: type, //MOBILE, NAME
			username: data.loginname,
			password: data.password,
			sessionId: data.sessionId,
			code: data.code,
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

export const apiLogout = function(callback) {
	request(M.POST, {
		title: '登出',
		url: '/user/exit/login',
		data: {
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

export const apiForgotPassword = function(data, callback, completeCb) {
	var type = 'MOBILE';
	if (isNaN(data.loginname)) {
		type = 'USERNAME';
	}
	request(M.POST, {
		title: '修改密码',
		url: '/user/forget/password',
		data: {
			type: type, //MOBILE, NAME
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

export const apiSecureProblem = function(data, callback, completeCb) {
	var type = 'MOBILE';
	if (isNaN(data.loginname)) {
		type = 'USERNAME';
	}
	request(M.POST, {
		title: '请求获取安全问题',
		url: '/user/query/problem/byUser',
		data: {
			type: type, //MOBILE, NAME
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

export const apiSecureAnswer = function(data, callback, completeCb) {
	var type = 'MOBILE';
	if (isNaN(data.loginname)) {
		type = 'USERNAME';
	}
	request(M.POST, {
		title: '提交安全问题',
		url: '/user/checkout/answer',
		data: {
			type: type, //MOBILE, NAME
			username: data.loginname,
			answer1: data.answer1, //MOBILE, NAME
			answer2: data.answer2,
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
