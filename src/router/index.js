/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {
	Home,
	Content
} from 'layout/';
import {
	Login
} from 'views/';
import User from './user/';
import AuditLog from './aduitLog/';
import Lp from './lp/';
import StdSymbol from './stdSymbol/';
import TradeRule from './tradeRule/';
import GroupTradeRule from './groupTradeRule/';

import QuoteRule from './quoteRule/';
import CurrentOrder from './currentOrder/';
import TradeLog from './tradeLog/';
import ProfitLog from './profitLog/';

import LpPosition from './lpPosition/';
import QuoteAdjust from './quoteAdjust/';
import StdSymbolPosition from './stdSymbolPosition/';
import Diagnosis from './diagnosis/';

import Mt4Positions from './mt4Positions/';
import TopTraders from './topTraders/';
console.log('PROFITLOG', ProfitLog);
export default new Router({
	routes: [{
			path: '/',
			name: 'Hello',
			hidden: true,
			redirect(to) {
				return 'login';
			}
		}, {
			path: '/login',
			name: '登录',
			hidden: true,
			component: Login
		},
		User,
		AuditLog,
		Lp,
		StdSymbol,
		TradeRule,
		GroupTradeRule,
		QuoteRule,
		QuoteAdjust,
		CurrentOrder,
		LpPosition,
		StdSymbolPosition,
		TradeLog,
		ProfitLog,

		Diagnosis,
		Mt4Positions,
		TopTraders
	]
})