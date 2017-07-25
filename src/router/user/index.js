/**
 * Created by sailengsi on 2017/5/11.
 */

import {
	Home,
	Content
} from 'layout/';

import from './user';

export default {
	path: '/home',
	name: '静态演示',
	icon: 'inbox',
	component: Home,
	redirect: '/home/user',
	children: [user]
};
