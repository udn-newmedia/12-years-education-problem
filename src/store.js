import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isEnterCollector: true,
    isEnterMainContent: false,
  },
  mutations: {
    updatedIsEnterCollector(state, payload) {
      state.isEnterCollector = payload;
    },
    updatedIsEnterMainContent(state, payload) {
      state.isEnterMainContent = payload;
    }
  },
  actions: {
    updatedIsEnterCollector(context, payload) {
      context.commit('updatedIsEnterCollector', payload);
    },
    updatedIsEnterMainContent(context, payload) {
      context.commit('updatedIsEnterMainContent', payload);
    }
  },
});
