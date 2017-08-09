/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import TradeRule from './tradeRule';

export default {
  path: '/home',
  name: 'home',
  icon: 'trade_rule',
  component: Home,
  redirect: '/home/trade_rule',
  leaf: true,
  direction: 'vertical',
  children: [TradeRule]
};