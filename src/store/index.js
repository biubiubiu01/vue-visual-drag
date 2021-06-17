import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentBacIndex: 0,
  },
  mutations: {
    SET_INDEX(state, index) {
      state.currentBacIndex = index;
    },
  },
  actions: {},
  modules: {},
});
