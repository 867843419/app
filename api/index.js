// 本地环境
// export const host = 'http://127.0.0.1:8080/of'; // 服务端地址
// export const xurl = 'http://127.0.0.1:8080'; // 前端 nginx 地址

// 协作环境
// export const host = 'http://192.168.0.110:80/of';
// export const xurl = 'http://192.168.0.107:8080';

// 生产环境
export const host = 'http://admin.esc.16inet.com/of';
export const xurl = 'http://esc.16inet.com';



/**
 * 状态键值
 */
export const loginUserKey = '__LOGIN_USER__';
export const tokenKey = '__TOKEN__';
export const expireKey = '__EXPIRE_AUTH__';
export const expire = 1 * 24 * 3600; // 过期时间, 单位: s.


/**
 *  统一 Http 方法类型封装
 */
export const M = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
	CONNECT: 'CONNECT',
	HEAD: 'HEAD',
	OPTIONS: 'OPTIONS',
	TRACE: 'TRACE',
}

/**
 * 统一 content-type 封装
 */
export const C = {
	JSON: 'application/json',
	FORM: 'application/x-www-form-urlencoded',
}

export const noUser = {
	loginUser: {},
	userToken: '',
	userId: -20191018,
};

/**
 * 获取用户信息
 */
export const getUser = function(callback) {
	isExpire(res => {
		if (res) {
			uni.getStorage({
				key: loginUserKey,
				success: function(res) {
					if (res.data) {
						var user = JSON.parse(res.data);
						console.log(user);
						callback({
							loginUser: user,
							userToken: user.userToken,
							userId: user.userId
						});
					} else {
						callback(noUser);
					}
				},
				fail: (res) => {
					//没有取到
					callback(noUser);
				}
			});
		} else {
			callback(noUser);
		}
	});
}

export const getUserSync = function(callback) {
	isExpire(res => {
		if (res) {
			return justUser();
		} else {
			return noUser;
		}
	});
}

export const justUser = function() {
	var user = noUser;
	var getuser = uni.getStorageSync(loginUserKey);
	if (getuser) {
		var tmpuser = JSON.parse(getuser);
		user = {
			loginUser: tmpuser,
			userToken: tmpuser.userToken,
			userId: tmpuser.userId
		};
	}
	return user;
}

// 判断是否过期, 为保证稳定性, 此处使用阻塞回调写法.
export const isExpire = function(callback) {
	uni.getStorage({
		key: expireKey,
		success: function(res) {
			if (res.data && !isNaN(res.data)) {
				if ((parseInt(res.data) + (expire * 1000)) >= new Date().getTime()) {
					callback(true)
				} else {
					console.warn('授权已过期!');
					callback(false);
				}
			} else {
				callback(false);
			}
		},
		fail: (res) => {
			//没有取到
			callback(false);
		}
	});
}

/**
 * 统一封装 request 请求类
 * url 必传.
 * 
 * @param {Object} rc
 */
export const request = function(method, rc, c) {
	getUser((res) => {
		uni.showLoading({
			title: rc.tip ? rc.tip : '正在处理...',
		});
		rc.method = method;
		rc.data = rc.data ? rc.data : {};
		rc.data['userId'] = res.userId;
		rc.data['_token'] = res.userToken;
		console.log('[@:' + rc.url + '] ' + ' => ' + JSON.stringify(rc.data));
		const requestTask = uni.request({
			method: method,
			header: rc.header ? rc.header : {
				'content-type': c ? c : C.FORM, //自定义请求头信息
				'_token': res.userToken,
				'userId': res.userId,
			},
			url: host + rc.url,
			data: rc.data,
			dataType: rc.dataType ? rc.dataType : 'json',
			fail: function(res) {
				console.error('[@:' + host + rc.url + '] ' + JSON.stringify(res));
				uni.showModal({
					title: "网络异常",
					// content: res.errMsg.length <= 30 ? res.errMsg : '请联系平台客服以获取支持!',
					content: '请联系平台客服以获取支持!',
					showCancel: false,
					confirmText: "确定"
				});
				if (typeof rc.fail === 'function') {
					rc.fail(res);
				}
			},
			success: function(res) {
				rc.reponseData = res.data;
				console.log(rc);
				console.log(res);
				if (res.data.code + '' !== '0') {
					if (res.data.code + '' === '520') { //授权失效.
						var vcs = getCurrentPages();
						var route = vcs[vcs.length - 1].route;
						if (route.indexOf('/auth/') === -1) {
							// 清空 Storage
							uni.removeStorage({
								key: loginUserKey,
							});
							uni.removeStorage({
								key: tokenKey,
							});
							uni.showModal({
								title: "系统提示",
								content: '登录授权已过期, 请重新登录',
								showCancel: false,
								confirmText: "确定",
								complete: function(confirm, cancel) {
									uni.navigateTo({
										url: '/pages/auth/login/login'
									});
								}
							});
							return false;
						}
					}
					uni.showModal({
						title: (rc.title ? rc.title : "操作") + "失败",
						content: (res.data.msg && res.data.msg.length <= 30) ? res.data.msg : '远程服务器异常, 请联系平台客服!',
						showCancel: false,
						confirmText: "确定"
					});
					if (typeof rc.error === 'function') {
						rc.error(res.data);
					}
				} else {
					if (typeof rc.success === 'function') {
						rc.success(res.data);
					}
				}
			},
			complete: function(res) {
				uni.hideLoading();
				if (typeof rc.complete === 'function') {
					rc.complete(res);
				}
			},
		});
	})
}

/**
 * 统一封装 upload  上传请求类
 * url 必传
 * 
 * @param {Object} rc
 */
export const uploader = function(rc) {
	getUser((res) => {
		rc.files = rc.files ? rc.files : [];
		rc.data = rc.data ? rc.data : {};
		rc.data.filePurpose = rc.data.filePurpose ? rc.data.filePurpose : 'alipayImages';
		rc.data['userId'] = res.userId;
		rc.data['_token'] = res.userToken;
		console.log('[@:' + rc.url + '] ' + ' => ' + JSON.stringify(rc.data));
		console.log(rc);
		uni.uploadFile({
			// header: {
			// 	"Content-Type": "multipart/form-data"
			// },
			url: host + rc.url,
			filePath: rc.file,
			name: 'file',
			formData: rc.data,
			success: res => {
				rc.reponseData = res.data;
				console.log(rc);
				if (res.data.code + '' !== '0') {
					uni.showModal({
						title: "上传失败",
						content: (res.data.msg && res.data.msg.length <= 30) ? res.data.msg : '远程服务器异常, 请联系平台客服!',
						showCancel: false,
						confirmText: "确定"
					});
					if (typeof rc.error === 'function') {
						rc.error(res.data);
					}
				} else {
					if (typeof rc.success === 'function') {
						rc.success(res.data);
					}
				}
			},
			fail: res => {
				uni.showModal({
					title: "上传失败",
					content: res.errMsg,
					showCancel: false,
					confirmText: "确定"
				});
				if (typeof rc.fail === 'function') {
					rc.fail(res);
				}
			}
		});
	})
}




////////// 子账户相关: 将之前登陆的用户存进来, 子账户替换到登陆账户.
export const loginParentKey = '__LOGIN_PARENT__';
export const tokenParentKey = '__TOKEN_PARENT__';
export const expireParentKey = '__EXPIRE_PARENT__';
export const expireParent = 1 * 24 * 3600; // 过期时间, 单位: s.
/**
 * 获取用户信息
 */
export const getParent = function(callback) {
	isExpireParent(res => {
		if (res) {
			uni.getStorage({
				key: loginParentKey,
				success: function(res) {
					if (res.data) {
						var user = JSON.parse(res.data);
						console.log(user);
						callback({
							loginParent: user,
							userTokenParent: user.userToken,
							userIdParent: user.userId
						});
					} else {
						callback(noUser);
					}
				},
				fail: (res) => {
					//没有取到
					callback(noUser);
				}
			});
		} else {
			callback(noUser);
		}
	});
}

export const getParentSync = function(callback) {
	isExpireParent(res => {
		if (res) {
			return justParent();
		} else {
			return noUser;
		}
	});
}

export const justParent = function() {
	var user = noUser;
	var getuser = uni.getStorageSync(loginParentKey);
	if (getuser) {
		var tmpuser = JSON.parse(getuser);
		user = {
			loginParent: tmpuser,
			userTokenParent: tmpuser.userToken,
			userIdParent: tmpuser.userId
		};
	}
	return user;
}

// 判断是否过期, 为保证稳定性, 此处使用阻塞回调写法.
export const isExpireParent = function(callback) {
	uni.getStorage({
		key: expireParentKey,
		success: function(res) {
			if (res.data && !isNaN(res.data)) {
				if ((parseInt(res.data) + (expireParent * 1000)) >= new Date().getTime()) {
					callback(true)
				} else {
					console.warn('上级账户授权已过期!');
					callback(false);
				}
			} else {
				callback(false);
			}
		},
		fail: (res) => {
			//没有取到
			callback(false);
		}
	});
}
