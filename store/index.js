/**
 * 全局状态机
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {
	loginUserKey,
	tokenKey,
	expireKey,
	expire,
	isExpire,
	getUser,
	getUserSync,
	noUser,

	loginParentKey,
	tokenParentKey,
	expireParentKey,
	expireParent,
	getParent,
	getParentSync,
	isExpireParent,
} from '@/api/index.js';
import {
	apiLogout
} from '@/api/auth.js';
import {
	generateAvatar
} from '@/util/avatar.js';
import {
	regxp
} from '@/validator/regxp.js';
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		key: loginUserKey,
		tokenKey: tokenKey,
		expireKey: expireKey,
		expire: expire,
		isLogin: false,
		loginUser: noUser.user,
		userToken: noUser.userToken,
		userId: noUser.userId,

		loginParentKey: loginParentKey,
		tokenParentKey: tokenParentKey,
		expireParentKey: expireParentKey,
		expireParent: expireParent,
		isLoginChild: false,
		loginParent: noUser.user,
		userTokenParent: noUser.userToken,
		userIdParent: noUser.userId,
	},
	mutations: {
		initStore(state, provider) {
			isExpire(res => {
				state.isLogin = res;
				if (res) {
					getUser(res => {
						state.loginUser = res.loginUser;
						if (state.loginUser && state.loginUser.avatar) {
							state.loginUser.ravatar = state.loginUser.avatar;
							state.loginUser.avatar = generateAvatar(state.loginUser.username, state.loginUser.avatar);
						}
						state.userToken = res.userToken;
						state.userId = res.userId;
					});
				}
			});
			isExpireParent(res => {
				state.isLoginChild = res;
				if (res) {
					getParent(res => {
						state.loginParent = res.loginParent;
						if (state.loginParent && state.loginParent.avatar) {
							state.loginParent.ravatar = state.loginParent.avatar;
							state.loginParent.avatar = generateAvatar(state.loginParent.username, state.loginParent.avatar);
						}
						state.userTokenParent = res.userTokenParent;
						state.userIdParent = res.userIdParent;
					});
				}
			})
		},
		login(state, provider) {
			if (provider && provider.userId) {
				console.log(JSON.stringify(state));
				console.log(JSON.stringify(provider));
				//将所有为空的字段设置为空字符串, 而不是显示为 null.
				for (let x in provider) {
					let zxx = provider[x];
					if (regxp.isBlank(zxx)) {
						provider[x] = '';
					}
				}
				state.isLogin = true;
				state.loginUser = provider;
				state.loginUser.ravatar = state.loginUser.avatar;
				state.loginUser.avatar = generateAvatar(state.loginUser.username, state.loginUser.avatar);
				state.userToken = provider.userToken;

				// 在 Storage 中备份一份
				uni.setStorageSync(state.key, JSON.stringify(provider));
				uni.setStorageSync(state.tokenKey, provider.userToken);
				uni.setStorageSync(state.expireKey, new Date().getTime()); // 记录当前时间.
				if(typeof provider.__callback === 'function'){
					provider.__callback();
				}
				uni.showToast({
					title: (provider.__tiptitle ? provider.__tiptitle : '登录') + '成功',
					icon: 'success',
					position: 'top',
				});
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/index/index',
					});
				}, 1200);
			} else {
				uni.showModal({
					title: (provider.__tiptitle ? provider.__tiptitle : '登录') + '失败',
					content: (provider.__tiperror ? provider.__tiperror : '远程服务器错误, 请联系平台客服!'),
					showCancel: false,
					confirmText: "确定"
				});
			}
		},
		remove(state) {
			state.isLogin = false;
			state.loginUser = {};
			state.userToken = '';
			state.userId = '';
			// 清空 Storage
			uni.removeStorageSync(loginUserKey);
			uni.removeStorageSync(tokenKey);
			uni.removeStorageSync(expireKey);
		},
		logout(state) {
			apiLogout(res => {
				state.isLogin = false;
				state.loginUser = {};
				state.userToken = '';
				state.userId = '';
				// 清空 Storage
				uni.removeStorageSync(loginUserKey);
				uni.removeStorageSync(tokenKey);
				uni.removeStorageSync(expireKey);
				// mutations.remove(state); //会导致 APP.vue 异常, 原因未知.
				uni.showToast({
					title: '退出成功, 正在转向登录...',
					icon: 'none',
					position: 'top',
				});
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/auth/login/login'
					});
				}, 1200);
			});
		},
		filter(state, provider) {
			uni.showLoading({
				title: '拼命加载中...',
			});
			isExpire(res => {
				uni.hideLoading();
				if (!res) {
					console.log('授权异常! 自动转向登录页...');
					if (provider) { // 是否显示提示信息
						uni.showModal({
							title: '系统提示',
							content: '您的授权已过期, 请重新登录!',
							showCancel: false,
							confirmText: '确定',
							complete: function(confirm, cancel) {
								uni.navigateTo({
									url: '/pages/auth/login/login'
								});
							}
						});
					} else {
						uni.navigateTo({
							url: '/pages/auth/login/login'
						});
					}
				} else {
					console.log('授权状态正常! 放行...');
				}
			});
		},
		update(state, provider) {
			for (let x in provider) {
				let zxx = provider[x];
				if (state.loginUser.hasOwnProperty(x)) {
					state.loginUser[x] = zxx;
				}
			}
		},
		//登录子账户
		loginChild(state, provider) {
			provider.__tiptitle = '切换到子账户';
			provider.__callback = () => {
				//1.将当前账户备份存储, 以备登录之后获取.
				state.isLoginChild = true;
				state.loginParent = state.loginUser;
				state.loginParent.ravatar = state.loginParent.avatar;
				state.loginParent.avatar = generateAvatar(state.loginParent.username, state.loginParent.avatar);
				state.userTokenParent = state.loginUser.userToken;
				
				// 在 Storage 中备份一份
				uni.setStorageSync(state.loginParentKey, JSON.stringify(provider));
				uni.setStorageSync(state.tokenParentKey, provider.userToken);
				uni.setStorageSync(state.expireParentKey, new Date().getTime()); // 记录当前时间.
			}
			//2.直接登录目标子账户, 其余逻辑交由授权系统接管.
			mutations.login(provider);
		},
		//返回父账户
		returnParent(state) {
			var tmp = JSON.parse(JSON.stringify(state.loginParent));
			state.isLoginChild = false;
			state.loginParent = {};
			state.userTokenParent = '';
			state.userIdParent = '';
			// 清空 Storage
			uni.removeStorageSync(loginParentKey);
			uni.removeStorageSync(tokenParentKey);
			uni.removeStorageSync(expireParentKey);
			//1.账户替换, 清空备份账户, 刷新当前页面
			mutations.login(tmp);
		},
	}
});

export default store
