import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    anchorList: [],
    isInFirstView: true,
    isEnterCollector: false,
    isEnterMainContent: false,
    isEnterChaosContent: false,
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
    addAnchor (state, anchor) {
      state.anchorList.push(anchor)
    },
    updateAnchorStatus (state, object) {
      state.anchorList[object.index].active = object.status;
    },
    updatedIsInFirstView(state, payload) {
      state.isInFirstView = payload;
    },
    updatedIsEnterCollector(state, payload) {
      state.isEnterCollector = payload;
      if (payload) state.isEnterChaosContent = false;
    },
    updatedIsEnterMainContent(state, payload) {
      state.isEnterMainContent = payload;
    },
    updatedIsEnterChaosContent(state, payload) {
      state.isEnterChaosContent = payload;
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
    addAnchor (context, anchor) {
      context.commit('addAnchor', anchor);
    },
    updateAnchorStatus (context, object) {
      context.commit('updateAnchorStatus', object);
    },
    updatedIsInFirstView(context, payload) {
      context.commit('updatedIsInFirstView', payload);
    },
    updatedIsEnterCollector(context, payload) {
      context.commit('updatedIsEnterCollector', payload);
    },
    updatedIsEnterMainContent(context, payload) {
      context.commit('updatedIsEnterMainContent', payload);
    },
    updatedIsEnterChaosContent(context, payload) {
      context.commit('updatedIsEnterChaosContent', payload);
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
