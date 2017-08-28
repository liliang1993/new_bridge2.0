import * as types from './mutations_types'
import Vue from 'vue';
export default {
  //     [types.UPDATE_TRADE_RULES](state,trade_rules) {
  //         console.log('remark_dialog',trade_rules);
  //         // Vue.set(state.trade_rules,remark_dialo.key,remark_dialog.config);
  //         state.trade_rules = trade_rules;
  //     },

  //     [types.UPDATE_REMARK_DIALOGS](state,remark_dialog) {
  //         console.log('remark_dialog',remark_dialog);
  //         Vue.set(state.remark_dialogs,remark_dialog.key,remark_dialog.config);
  //     },
  //     [types.DELETE_REMARK_DIALOGS](state,remark_dialog_id) {
  //             for(var k in state.remark_dialogs){
  //                     if(remark_dialog_id === k){
  //                         Vue.delete(state.remark_dialogs,k);
  //                     }
  //             }
  //     },
  //     [types.UPDATE_TRADERULE_REMARK](state) {
  //             state.update_traderule_remark = true;
  //     },

  //     [types.UPDATE_COPY_TO_NEW__GROUP_DIALOGS](state,copy_to_new_group_dialog) {
  //         Vue.set(state.copy_to_new_group_dialogs,copy_to_new_group_dialog.key,copy_to_new_group_dialog.config);
  //     },

  //      [types.DELETE_COPY_TO_NEW__GROUP_DIALOGS](state,copy_to_new_group_dialog_id) {
  //             for(var k in state.copy_to_new_group_dialogs){
  //                     if(copy_to_new_group_dialog_id === k){
  //                         Vue.delete(state.copy_to_new_group_dialogs,k);
  //                     }
  //             }
  //     },

  // [types.UPDATE_TRADERULE_TABLE](state,flag) {
  //             state.update_traderule_table = flag;
  //     },
  [types.UPDATE_EDIT_RULES_DICT](state,{common,attributes}) {
    Vue.set(state.edit_rules_dict,"common",common);
    Vue.set(state.edit_rules_dict,"attributes",attributes);
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
  }, [types.UPDATE_TRADE_RULES](state, trade_rules) {
    console.log('remark_dialog', trade_rules);
    // Vue.set(state.trade_rules,remark_dialo.key,remark_dialog.config);
    state.trade_rules = trade_rules;
  }, [types.HIDE_EDIT_TRADE_RULE](state) {
    state.edit_trade_rule = false;
  }, [types.SHOW_EDIT_TRADE_RULE](state) {
    state.edit_trade_rule = true;
  }

};