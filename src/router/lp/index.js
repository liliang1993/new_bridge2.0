/**
 * Created by sailengsi on 2017/5/11.
 */

import {
	Home,
	Content
} from 'layout/';

import Lp from './lp';

export default {
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: Home,
	redirect: '/home/lp',
	leaf: true,
	children: [Lp]
};
