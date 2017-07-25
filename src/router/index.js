/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {Home, Content} from 'layout/';
import {Login} from 'views/';
import User from './user/';
import AuditLog from './aduitLog/';
import Lp from './lp/';
import LpSymbol from './lpSymbol/';
import TradeRule from './tradeRule/';
import QuoteRule from './quoteRule/';
import CurrentOrder from './currentOrder/';
import TradeLog from './tradeLog/';
import LpPosition from './lpPosition/';
import QuoteAdjust from './quoteAdjust/';
import StdSymbolPosition from './stdSymbolPosition/';
import Diagnosis from './diagnosis/';

export default new Router({
	routes: [
		{
			path  : '/',
			name  : 'Hello',
			hidden: true,
			redirect(to){
				return 'login';
			}
		}, {
			path     : '/login',
			name     : '登录',
			hidden   : true,
			component: Login
		},
		User,
		AuditLog,
		Lp,
		LpSymbol,
		TradeRule,
		QuoteRule,
		CurrentOrder,
		TradeLog,
		LpPosition,
		QuoteAdjust,
		StdSymbolPosition,
		Diagnosis
	]
})