/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import User from './user';

export default {
  path: '/home',
  name: 'home',
  icon: 'user',
  component: Home,
  redirect: '/home/user',
  leaf: true,
  direction: 'vertical',
  children: [User]
};