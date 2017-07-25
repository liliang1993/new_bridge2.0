/**
 * Created by sailengsi on 2017/5/11.
 */

import {
	Content
} from 'layout/';

import {
	user
} from 'views/';

export default {
	path: 'user',
	name: '公共内容',
	icon: 'inbox',
	component: Content,
	redirect: '/home/user/index',
	children: [{
		path: 'index',
		name: '用户',
		icon: 'bar-chart',
		component: User
	}]
};
