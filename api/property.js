import {
	M,
	C,
	request
} from '@/api/index.js';

//code: 0/500
export const apiFormTransferStamp = function(data, callback) {
	request(M.POST, {
		url: '/user/give/tradingVolume',
		data: {
			userId2: data.toId,
			count: data.count,
			dealPassword: data.dealPassword,
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

export const apiFormTransferActivecode = function(data, callback) {
	request(M.POST, {
		url: '/user/give/invitationCode',
		data: {
			userId2: data.toId,
			count: data.count,
			dealPassword: data.dealPassword,
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

export const apiFormConvertHonest = function(data, callback) {
	request(M.POST, {
		url: '/user/give/credibleMoney',
		data: {
			credibleMoney: data.credibleMoney,
			dealPassword: data.dealPassword,
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

// {msg: "操作成功", code: 0, data: Array(2)}
// code: 0
// data: Array(2)
// 0:
// avatar: null
// count: 1 //交易数量
// lastCount: 9 //快照
// type: 0
// userId: 2
// userLevel: 1
// username: "狗蛋2号"
export const apiRecord = function(type, callback, completeCb) {
	request(M.GET, {
		url: '/assetsRecord/list',
		data: {
			type: type, //0 激活码 1诚信金 2 交易卷 3 总资产
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
