import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bridgeLoaded: false,
		localData: {},
  },
  mutations: {
		setState(state, data) {
			if( ! data.key || ! data.value ) {
				console.log('data format: {key, value}');
			}
			state[data.key] = data.value;
		}
  },
  actions
})
