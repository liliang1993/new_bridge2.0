import * as types from './mutations_types'
import Vue from 'vue';
export default {
  [types.UPDATE_TLOG_LP_ORDER_DICTS](state, {
    id,
    value
  }) {
    console.log('123', value, id);
    if (!(id in state.lp_order_dicts)) {
      Vue.set(state.lp_order_dicts, id, value);
    }
  }, [types.DELETE_TLOG_LP_ORDER_DICTS](state, id) {
    Vue.delete(state.lp_order_dicts, id);
  }
};