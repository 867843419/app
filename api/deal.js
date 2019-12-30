import {
	M,
	C,
	request
} from '@/api/index.js';

//code: 0/500

// {msg: "操作成功", code: 0, data: Array(1)}
// code: 0
// data: Array(1)
// 0:
// createBy: null
// createTime: null
// moneyLimit: 1000
// osCount: 1
// osCreateDate: "2019-10-13 18:29:22"
// osId: 1
// osRepositoryId: null
// osStatus: 0
// osUserId: 1
// params: {}
// remark: null
// searchValue: null
// updateBy: null
// updateTime: null
// userLevel: 1
// username: "狗蛋"
export const apiQueneList = function(callback) {
	request(M.GET, {
		url: '/openSubscribe/today/list',
		data: {
			// osUd: 1,//选传, 只查询目标用户的排队信息
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

export const apiRepo = function(callback) {
	request(M.POST, {
		url: '/openSubscribe/queryRepository',
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
}

/**
 * 预约
 */
export const apiSubscribe = function(data, callback) {
	request(M.POST, {
		url: '/openSubscribe/save',
		data: {
			osStatus: 0, //0 正常预约
			osCount: data.appointDay, // 预约天数: 3-30 天
			osRepositoryId: data.osRepositoryId, //仓库等级 => 开仓积分.
			password: data.exchangePassword, // 交易密码
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

/**
 * 交割
 */
export const apiDeliver = function(data, callback) {
	request(M.POST, {
		url: '/withdrawal/save',
		data: {
			wdMoney: data.deliverCount, //提现额度
			exchangePassword: data.exchangePassword, // 交易密码
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

//获取开仓订单列表.
export const apiGetOrderOpen = function(callback) {
	request(M.GET, {
		url: '/orderOpen/confirmed/list',
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
}

//获取开仓订单详情信息
export const apiGetOrderDetailOpen = function(id, callback) {
	request(M.GET, {
		url: '/orderOpen/open/detail',
		data: {
			opId: id,
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


//获取平仓订单列表.
export const apiGetOrderUnwind = function(callback) {
	request(M.GET, {
		url: '/orderUnwind/confirmed/list',
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
}

//获取开仓订单详情信息
export const apiGetOrderDetailUnwind = function(id, callback) {
	request(M.GET, {
		url: '/orderUnwind/detail',
		data: {
			unId: id,
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


//获取交割订单列表.
export const apiGetOrderWithDrawal = function(callback) {
	request(M.GET, {
		url: '/withdrawal/list',
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
}

export const apiReport = function(orId, callback){
	request(M.POST, {
		url: '/withdrawal/report',
		data: {
			orId: orId,
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
