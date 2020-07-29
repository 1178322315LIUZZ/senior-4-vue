import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {}
	},
	mutations: {
		login(state, obj) {
			state.user = obj;
		}
	},
	actions: {
		loginAction(context, obj) {
			context.commit('login', obj);
		}
	},
	modules: {}
})
