import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//单个模块状态

Vue.use(Vuex);
const state = {};

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {},
    strict: debug
})
