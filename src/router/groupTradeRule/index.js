/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import GroupTradeRule from './groupTradeRule';

export default {
  path: '/home',
  name: 'home',
  component: Home,
  redirect: '/home/trade_rule',
  hidden: true,
  children: [GroupTradeRule]
};