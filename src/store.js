import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isInFirstView: true,
    isEnterCollector: false,
    isEnterMainContent: false,
    isFocusOneCard: false,
    cardActiveIndex: -1,
  },
  mutations: {
    updatedIsInFirstView(state, payload) {
      state.isInFirstView = payload;
    },
    updatedIsEnterCollector(state, payload) {
      state.isEnterCollector = payload;
    },
    updatedIsEnterMainContent(state, payload) {
      state.isEnterMainContent = payload;
    },
    updatedIsFocusOneCard(state, payload) {
      state.isFocusOneCard = payload;
    },
    updatedCardActiveIndex(state, payload) {
      state.cardActiveIndex = payload;
    },
  },
  actions: {
    updatedIsInFirstView(context, payload) {
      context.commit('updatedIsInFirstView', payload);
    },
    updatedIsEnterCollector(context, payload) {
      context.commit('updatedIsEnterCollector', payload);
    },
    updatedIsEnterMainContent(context, payload) {
      context.commit('updatedIsEnterMainContent', payload);
    },
    updatedIsFocusOneCard(context, payload) {
      context.commit('updatedIsFocusOneCard', payload);
    },
    updatedCardActiveIndex(context, payload) {
      context.commit('updatedCardActiveIndex', payload);
    },
  },
});
