/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import StdSymbolPosition from './stdSymbolPosition';

export default {
  path: '/home',
  name: 'home',
  icon: 'std_sym_pos',
  component: Home,
  redirect: '/home/stdsymbol_position',
  leaf: true,
  direction: 'vertical',
  children: [StdSymbolPosition]
};