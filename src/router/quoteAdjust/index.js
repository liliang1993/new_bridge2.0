/**
 * Created by sailengsi on 2017/5/11.
 */

import {
	Home,
	Content
} from 'layout/';

import QuoteAdjust from './quoteAdjust';

export default {
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: Home,
	redirect: '/home/quote_adjust',
	leaf: true,
	children: [QuoteAdjust]
};
