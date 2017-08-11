/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import Diagnosis from './diagnosis';

export default {
  path: '/home',
  name: 'home',
  icon: 'diagnosis',
  component: Home,
  redirect: '/home/diagnosis',
  leaf: true,
  direction: 'vertical',
  children: [Diagnosis]
};