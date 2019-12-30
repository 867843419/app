<template>
	<view></view>
</template>

<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { loginUserKey, tokenKey, isExpire, getUserSync } from '@/api/index.js';
export default {
	name: 'auth-filter',
	computed: {
		...mapState(['loginUser', 'isLogin'])
	},
	watch: {
		isLogin() {
			Vue.prototype.isLogin = this.isLogin;
			// this.filter();
		},
		loginUser() {
			Vue.prototype.loginUser = this.loginUser;
		}
	},
	created() {
		this.initStore();
	},
	onLoad() {
		Vue.prototype.filter = () => this.filter();
		Vue.prototype.login = provider => this.login(provider);
		Vue.prototype.logout = () => this.logout();
	},
	onShow() {
		this.filter();
	},
	methods: {
		...mapMutations(['initStore', 'filter', 'remove', 'login', 'logout', 'loginChild', 'returnParent']),
	}
};
</script>

<style></style>
