import {
  Home,
  Content
} from 'layout/';

import TopTraders from './topTraders';

export default {
  path: '/home',
  name: 'home',
  component: Home,
  redirect: '/home/top_traders',
  leaf: true,
  direction: 'landscape',
  children: [TopTraders]
};