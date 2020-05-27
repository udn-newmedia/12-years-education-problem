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
    chapterBannerActiveList: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
    nextChapterBannerActiveList: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
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
    updatedChapterBannerActiveList(state, payload) {
      state.chapterBannerActiveList[payload] = true;
    },
    updatedNextChapterBannerActiveList(state, payload) {
      state.nextChapterBannerActiveList[payload] = true;
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
    updatedChapterBannerActiveList(context, payload) {
      context.commit('updatedChapterBannerActiveList', payload);
    },
    updatedNextChapterBannerActiveList(context, payload) {
      context.commit('updatedNextChapterBannerActiveList', payload);
    },
  },
});
