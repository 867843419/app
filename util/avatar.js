import {
	regxp
} from '@/validator/regxp.js';
/**
 * 生成用户默认头像
 * 
 * @param {Object} state
 */
export const generateAvatar = function(username, avatar) {
	if (regxp.isNotBlank(avatar) && isNaN(avatar)) {
		return avatar;
	}
	if(!username || (username+'').trim() === ''){
		username = 'U';
	}
	var avatar = '';
	try {
		var name = username.charAt(0);
		var fontSize = 70;
		var fontWeight = 'bold';
		var canvas = document.createElement('canvas');
		canvas.width = 140;
		canvas.height = 140;
		var context = canvas.getContext('2d');

		if (username.charAt(0) === '用' || username.charAt(0) === '未') { //特殊的用一个好看的默认颜色.
			return '#2d8cf0';
		}
		var str = '';
		for (var i = 0; i < username.length; i++) {
			str += parseInt(username[i].charCodeAt(0), 10).toString(16);
		}
		var bgcolor = '#' + str.slice(1, 4);

		context.fillStyle = bgcolor; //背景颜色: 根据用户名第一个字生成16进制背景色.
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = '#FFF'; //文字颜色: 白色.
		context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
		context.textAlign = 'center';
		context.textBaseline = "middle";
		context.fillText(name, fontSize, fontSize);
		avatar = canvas.toDataURL("image/png");
	} catch (e) {
		console.error(e);
	}
	return avatar;
};
