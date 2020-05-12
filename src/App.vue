<template lang="pug">
  div#app
    CardsCollector
    Abstract
    PageFooter
      FooterEditor
        div
          p 製作人
          p 洪欣慈
        div
          p 視覺設計
          p 張心慈
        div
          p 網頁製作
          p 楊若榆
        div
          p 製作單位
          p 聯合報新媒體中心、<br>視覺設計中心、<br>數據中心
        div
          p 監製
          p 聯合報新聞部
      FooterShare
      FooterFbComment
      FooterLogo
    PageBackTop
</template>

<script>
import Abstract from '@/components/Abstract.vue';
import CardsCollector from '@/components/cards_collector/CardsCollector.vue';

import FooterEditor from '@/components/footer/FooterEditor.vue';
import FooterFbComment from '@/components/footer/FooterFbComment.vue';
import FooterLogo from '@/components/footer/FooterLogo.vue';
import FooterShare from '@/components/footer/FooterShare.vue';
import PageFooter from '@/components/footer/PageFooter.vue';
import PageBackTop from '@/components/layout/PageBackTop.vue';

export default {
  name: 'App',
  components: {
    Abstract,
    CardsCollector,
    FooterEditor,
    FooterFbComment,
    FooterLogo,
    FooterShare,
    PageFooter,
    PageBackTop,
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="sass" scoped>

</style>
