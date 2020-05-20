import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isEnterCollector: true,
    isEnterMainContent: false,
    cardCollector: {
      currentIndex: 1,
      enterMode: false,
      loopRow: 0,
      loopCol: 0,
    },
  },
  mutations: {
    updatedIsEnterCollector(state, payload) {
      state.isEnterCollector = payload;
    },
    updatedIsEnterMainContent(state, payload) {
      state.isEnterMainContent = payload;
    },
    updatedCardCurrendIndex(state, payload) {
      state.cardCollector.currentIndex = payload;
    },
    updatedCardEnterMode(state, payload) {
      state.cardCollector.enterMode = payload;
    },
    updatedLoopRow(state, payload) {
      state.cardCollector.loopRow = payload;
    },
    updatedLoopCol(state, payload) {
      state.cardCollector.loopCol = payload;
    }
  },
  actions: {
    updatedIsEnterCollector(context, payload) {
      context.commit('updatedIsEnterCollector', payload);
    },
    updatedIsEnterMainContent(context, payload) {
      context.commit('updatedIsEnterMainContent', payload);
    },
    updatedCardCurrendIndex(context, payload) {
      context.commit('updatedCardCurrendIndex', payload);
    },
    updatedCardEnterMode(context, payload) {
      context.commit('updatedCardEnterMode', payload);
    },
    updatedLoopRow(context, payload) {
      context.commit('updatedLoopRow', payload);
    },
    updatedLoopCol(context, payload) {
      context.commit('updatedLoopCol', payload);
    }
  },
});
