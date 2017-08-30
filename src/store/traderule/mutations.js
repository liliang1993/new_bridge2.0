import * as types from './mutations_types'
import Vue from 'vue';
export default {

  [types.UPDATE_EDIT_RULES_DICT](state, {
    common,
    attributes
  }) {
    Vue.set(state.edit_rules_dict, "common", common);
    Vue.set(state.edit_rules_dict, "attributes", attributes);
  },
  // [types.DELETE_EDIT_RULES_DICTS](state, edit_rules_id) {
  //   for (var item of state.edit_rules_dicts) {
  //     if (edit_rules_id === item.id) {
  //       var index = state.edit_rules_dicts.indexOf(item);
  //       state.edit_rules_dicts.splice(index, 1);
  //     }
  //   }
  // }, 
  [types.SHOW_TRADAE_GROUP](state) {
    state.add_trade_group = true;
  }, [types.HIDE_TRADAE_GROUP](state) {
    state.add_trade_group = false;
  }, [types.SHOW_TRADE_RULE](state) {
    state.add_trade_rule = true;
  }, [types.HIDE_TRADE_RULE](state) {
    state.add_trade_rule = false;
  }, [types.HIDE_EDIT_TRADE_RULE](state) {
    state.edit_trade_rule = false;
  }, [types.SHOW_EDIT_TRADE_RULE](state) {
    state.edit_trade_rule = true;
  }, [types.UPDATE_TRADE_RULES_TABLE](state, bool) {
    // Vue.set(state.trade_rules,remark_dialo.key,remark_dialog.config);
    state.update_trade_rules_flag = bool;
  },

};