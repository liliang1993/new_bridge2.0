/**
 * Created by sailengsi on 2017/5/11.
 */

import {
	Home,
	Content
} from 'layout/';

import LpPosition from './lpPosition';

export default {
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: Home,
	redirect: '/home/lp_position',
	leaf: true,
	children: [LpPosition]
};
