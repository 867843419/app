import {
	M,
	C,
	request
} from '@/api/index.js';

export const apiAbout = function(callback, completeCb) {
	request(M.GET, {
		url: '/notice/query/list',
		data: {
			noticeType: 'ABOUT_US',
		},
		success: function(res) {
			callback(res);
		},
		complete: function(res) {
			if (typeof completeCb === 'function') {
				completeCb(res);
			}
		}
	}, C.JSON);
};

export const apiFeedback = function(content, callback) {
	request(M.POST, {
		url: '/feedback/add/feedback',
		data: {
			fbContent: content,
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

// {msg: "操作成功", code: 0, data: {…}}
// code: 0
// data:
// createBy: null
// createTime: null
// noUserId: null
// noticeContent: "52095ejwgrejgjrwgkjrekjgrjgkjrekjgekjrgkjrkgrekjgkjrgkjrekjgkergkjrekjgkj"
// noticeCreateDate: "2019-10-17 22:07:48"
// noticeId: 2
// noticeTitle: "213123123"
// noticeType: "NOTICE"
// params: {}
// remark: null
// searchValue: null
// summary: null
// updateBy: null
// updateTime: null
export const apiMessage = function(id, callback) {
	request(M.GET, {
		url: '/notice/query/by/id',
		data: {
			id: id,
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
// createBy: null
// createTime: null
// noUserId: null
// noticeContent: null
// noticeCreateDate: "2019-10-17 22:07:48"
// noticeId: 2
// noticeTitle: "213123123"
// noticeType: "NOTICE"
// params: {}
// remark: null
// searchValue: null
// summary: "52095ejwgrejgjrwgkjrekjgrjgkjre"
// updateBy: null
// updateTime: null
export const apiMessageList = function(callback) {
	request(M.GET, {
		url: '/notice/query/sys/list',
		data: {
			userId: 1,
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
