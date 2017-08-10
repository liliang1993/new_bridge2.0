import {
  Home,
  Content
} from 'layout/';

import Mt4Position from './mt4Position';

export default {
  path: '/home',
  name: 'home',
  component: Home,
  redirect: '/home/mt4_position',
  leaf: true,
  direction: 'landscape',
  children: [Mt4Position]
};