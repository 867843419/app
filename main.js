import Vue from 'vue'
import App from './App'
import store from './store'
import {
	regxp
} from '@/validator/regxp.js';
import {
	validator
} from '@/validator/validator.js';
import {
	host,
	xurl,
	getUserSync,
} from '@/api/index.js';

Vue.prototype.loginUser = getUserSync();
Vue.prototype.$store = store;
Vue.prototype.appName = 'ESD期证循环交易系统';
Vue.prototype.appHost = host;
Vue.prototype.appUrl = xurl;
Vue.prototype.regxp = regxp;
Vue.prototype.validator = validator;
Vue.prototype.isArray = Array.isArray || regxp.isArray;
Vue.prototype.isNotNull = regxp.isNotNull;
Vue.prototype.isNull = regxp.isNull;
Vue.prototype.isNotBlank = regxp.isNotBlank;
Vue.prototype.isBlank = regxp.isBlank;
Vue.prototype.now = Date.now || function() {
	return new Date().getTime();
};
Vue.prototype.datetime = function(timestamp, format) {
	var str = format = format ? format : this.FORMAT_DATE_TIME;
	var date = timestamp ? new Date(timestamp) : new Date();
	var Week = ['Sun', 'Man', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'];
	str = str.replace(/yyyy|YYYY/, date.getFullYear());
	str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() %
		100));
	var month = date.getMonth() + 1;
	str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
	str = str.replace(/M/g, month);
	str = str.replace(/w|W/g, Week[date.getDay()]);
	str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
	str = str.replace(/d|D/g, date.getDate());
	str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
	str = str.replace(/h|H/g, date.getHours());
	str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
	str = str.replace(/m/g, date.getMinutes());
	str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
	str = str.replace(/s|S/g, date.getSeconds());
	return (str.indexOf("NaN") !== -1) ? "" : str;
};
Vue.prototype.serial = function(numCount, wordCount, myDefinedSN) {
	numCount = numCount ? numCount : 6;
	wordCount = wordCount ? wordCount : 2;
	myDefinedSN = myDefinedSN ? '-' + myDefinedSN : '';
	var timestamp = new Date().getTime(); //需要13位毫秒级时间戳
	var $nums = '0123456789';
	var numsRandom = '';
	for (var i = 0; i < numCount; i++) {
		//需要6位随机数字
		numsRandom += $nums.charAt(Math.floor(Math.random() * $nums.length));
	}
	var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charsRandom = '';
	for (var i = 0; i < wordCount; i++) {
		//需要2位随机字母
		charsRandom += $chars.charAt(Math.floor(Math.random() * $chars.length));
	}
	return charsRandom + timestamp + numsRandom + myDefinedSN; //13位时间戳(毫秒级) + 8位随机数(2位字母置于开头, 6位数字置于结尾)
};



//底部导航栏组件
import deal from './pages/deal/home.vue'
Vue.component('deal', deal)
import property from './pages/property/home.vue'
Vue.component('property', property)
import market from './pages/market/home.vue'
Vue.component('market', market)
import mine from './pages/mine/home.vue'
Vue.component('mine', mine)

//顶部导航栏组件
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

//剪贴板插件
// import VueClipboard from 'vue-clipboard2'
// Vue.use(VueClipboard)
// import VueSeamlessScroll from 'vue-seamless-scroll'
// Vue.use(VueSeamlessScroll)





Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
