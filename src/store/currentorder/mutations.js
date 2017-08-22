import * as types from './mutations_types'
import Vue from 'vue';
export default {
  [types.UPDATE_LP_ORDER_DICTS](state, {id,value}) {
  	var a =id in state.lp_order_dicts;
  	console.log('88888',a);
    // Vue.set(state.edit_rules_dicts,view_rules_dialog.key,view_rules_dialog.config);
    if(! (id in state.lp_order_dicts) ){
        Vue.set(state.lp_order_dicts,id,value);
    }
  }, 
  [types.DELETE_LP_ORDER_DICTS](state, id) {
    Vue.delete(state.lp_order_dicts,id);
  }
};