/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  Home,
  Content
} from 'layout/';

import AuditLog from './aduitLog';

export default {
  path: '/home',
  name: 'home',
  icon: 'audit_log',
  component: Home,
  redirect: '/home/audit_log',
  direction: 'vertical',
  leaf: true,
  children: [AuditLog]
};