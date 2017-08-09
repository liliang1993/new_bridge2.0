/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import CurrentOrder from './currentOrder';

export default {
  path: '/home',
  name: 'home',
  icon: 'current_ord',
  component: Home,
  redirect: '/home/current_order',
  leaf: true,
  direction: 'vertical',
  children: [CurrentOrder]
};