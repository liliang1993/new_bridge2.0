import * as types from './mutations_types'
import Vue from 'vue';
export default {
  [types.SHOW_ADD_QUOTERULE_TABLE](state) {
    state.show_addQuoteRule_flag = true;
  }, [types.HIDE_ADD_QUOTERULE_TABLE](state) {
    state.show_addQuoteRule_flag = false;
  }, [types.SHOW_EDIT_QUOTERULE_TABLE](state) {
    state.show_editQuoteRule_flag = true;
  }, [types.HIDE_EDIT_QUOTERULE_TABLE](state) {
    state.show_editQuoteRule_flag = false;
  },
  [types.UPDATE_QUOTERULE_TABLE](state,flag) {
    state.update_quoteRule_flag = flag;
  },
  [types.UPDATE_QUOTERULE_DICT](state,dict) {
    state.quoteRule_dict = dict;
  }
  
};