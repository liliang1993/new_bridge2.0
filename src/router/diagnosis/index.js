/**
 * Created by sailengsi on 2017/5/11.
 */

import {
	Home,
	Content
} from 'layout/';

import Diagnosis from './diagnosis';

export default {
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: Home,
	redirect: '/home/diagnosis',
	leaf: true,
	children: [Diagnosis]
};
