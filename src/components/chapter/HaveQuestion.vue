<template lang="pug">
section.have-question
  article.article
    h2 有話想說
    div.have-question__img
      img(:src="selectSrc_3(hqSrc.mob, hqSrc.mob, hqSrc.pc)" alt="有話想說")
    div.have-question__collector
      p 你對台灣教育、上路一年的108課綱有話想說嗎？歡迎寫下看法，《聯合報》今年將持續追蹤報導此波教改，你的心聲與建議，都是我們的重要報導線索。
      a(
        href="#"
        target="_blank"
        rel="noopener"
        aria-label="have question"
        title="have question"
        @click="sendGA(formatGA('HaveQuestion'))"
      )
        button.have-question__button(
          aria-label="我有問提"
          name="我有問提"
        )
          NmdButton(
            textColor="#cf5454"
            bgColor="#cf5454"
            theme="outlined"
            border="m"
            size="m"
          ) 新生蒐集
</template>

<script>
import { autoResize_3, selectSrcMethod_3, sendGaMethods } from '@/mixins/masterBuilder.js';
import NmdButton from '@/components/_common/pinhead/NmdButton.vue';

export default {
  name: 'NextBanner',
  mixins: [autoResize_3, selectSrcMethod_3, sendGaMethods],
  components: {
    NmdButton
  },
  computed: {
    hqSrc() {
      return {
        mob: require('~/img/have_to_say/pic_collect_m.jpg'),
        pc: require('~/img/have_to_say/pic_collect.jpg'),
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.have-question {
  padding: 32px 0;
  min-height: 80vh;
  @include pc {
    min-height: 55vh;
  }
  h2 {
    writing-mode: vertical-lr;
    margin: 0 auto;
    color: #ba4141;
    text-shadow: 0 3px 17px rgba(0, 0, 0, 0.12);
    font-family: source-han-seri-tc;
    font-weight: bold;
  }
  .article {
    padding-top: 0;
  }

  .have-question__img, .have-question__collector {
    position: relative;
    @include pc {
      position: absolute;
    }
  }
  .have-question__img {
    margin-top: 24px;
    @include pc {
      right: 0;
      width: calc(50% - 1rem);
      margin-top: 0;
      transform: translateY(-10rem);
    }
    img {
      width: 100%;
      @include pc {
        width: 125%;
        margin-left: 32px;
      }
    }
  }
  .have-question__collector {
    padding: 8%;
    @include pc {
      left: 0;
      width: calc(50% + 1rem);
      padding: 0;
      margin-top: 24px;
      p {
        margin-bottom: 16px;
      }
    }
  }
}
.have-question__button {
  width: 176px;
  @include clean-btn;
}
</style>