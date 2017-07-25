/**
 * Created by sailengsi on 2017/5/11.
 */

import {
	Home,
	Content
} from 'layout/';

import LpSymbol from './lpSymbol';

export default {
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: Home,
	redirect: '/home/lp_symbol',
	leaf: true,
	children: [LpSymbol]
};
