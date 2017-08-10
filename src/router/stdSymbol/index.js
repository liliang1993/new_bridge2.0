/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import StdSymbol from './stdSymbol';

export default {
  path: '/home',
  name: 'home',
  icon: 'std_sym',
  component: Home,
  redirect: '/home/std_symbol',
  leaf: true,
  direction: 'vertical',
  children: [StdSymbol]
};