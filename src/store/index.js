import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import router from './router/';
import leftmenu from './leftmenu/';
import user from './userinfo/';
import global from './global/';
import traderule from './traderule/';
import currentorder from './currentorder/';
import clienttradelog from './clienttradelog/';
import profitlog from './profitlog/';
import mt4position from './mt4position/';
import quoterule from './quoterule/';

export default new Vuex.Store({
    modules: {
        global,
        router,
        leftmenu,
        user,
        traderule,
        currentorder,
        clienttradelog,
        profitlog,
        mt4position,
        quoterule
    }
});