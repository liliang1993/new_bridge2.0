import {
  Home,
  Content
} from 'layout/';

import ProfitLog from './profitLog';

export default {
  path: '/home',
  name: 'home',
  component: Home,
  redirect: '/home/user',
  hidden: true,
  children: [ProfitLog]
};