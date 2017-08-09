/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import QuoteAdjust from './quoteAdjust';

export default {
  path: '/home',
  name: 'home',
  icon: 'quote_adjust',
  component: Home,
  redirect: '/home/quote_adjust',
  leaf: true,
  direction: 'vertical',
  children: [QuoteAdjust]
};