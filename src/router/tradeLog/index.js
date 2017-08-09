/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import TradeLog from './tradeLog';

export default {
  path: '/home',
  name: 'home',
  icon: 'trade_log',
  component: Home,
  redirect: '/home/trade_log',
  leaf: true,
  direction: 'vertical',
  children: [TradeLog]
};