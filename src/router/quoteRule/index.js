/**
 * Created by sailengsi on 2017/5/11.
 */

import {
	Home,
	Content
} from 'layout/';

import QuoteRule from './quoteRule';

export default {
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: Home,
	redirect: '/home/quote_rule',
	leaf: true,
	children: [QuoteRule]
};
