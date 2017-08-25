import * as types from './mutations_types'
import Vue from 'vue';
export default {
  [types.SHOW_MT4_POSITIONS](state) {
    state.isShow = true;
  }, [types.HIDE_MT4_POSITIONS](state) {
    state.isShow = false;
  }, [types.UPDATE_MT4_POSITIONS_RESULT](state, result) {
    state.result = result;
  }
};