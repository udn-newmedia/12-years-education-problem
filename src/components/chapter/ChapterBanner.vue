<template lang="pug">
article.chapter-banner-container(:data-cb-index="index")
  div.chapter-banner
    div.chapter-banner__left(:class="{ 'fade-in-1': fadeInFlag }")
      h3 {{problem}}
    div.chapter-banner__right
      figure.chapter-banner__img-container(:class="{ 'fade-in-2': fadeInFlag }")
        div.chapter-line-top
        img(
          :src="selectSrc_3(coverSrc.mob, coverSrc.mob, coverSrc.pc)"
          :alt="problem"
        )
      h2(
        :class="{ 'fade-in-1': fadeInFlag }"
      ) {{title.replace('^_^', deviceType !== 'pc' ? '\n': '&nbsp')}}
      table(:class="{ 'fade-in-2': fadeInFlag }")
        tbody
          tr
            td
              ul 
                li.li--grey 
                  span.td-text 問題點：
            td 
              span.td-text {{question}}
          tr
            td
              ul 
                li.li--white
                  span.td-text 理想上：
            td 
              span.td-text {{ideal}}
          tr
            td
              ul 
                li.li--white
                  span.td-text 現實上：
            td 
              span {{truth}}
  div.chapter-line-bottom
  
</template>

<script>
import { autoResize_3, selectSrcMethod_3 } from '@/mixins/masterBuilder.js';

export default {
  name: 'ChapterBanner',
  mixins: [autoResize_3, selectSrcMethod_3],
  props: {
    index: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    ideal: {
      type: String,
      required: true,
    },
    truth: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    }
  },
  computed: {
    coverSrc() {
      if (this.cover) {
        return {
          mob: require(`~/img/cover/mob/${this.cover}`),
          pc: require(`~/img/cover/pc/${this.cover}`),
        }
      }

      return null;
    },
    fadeInFlag() {
      return this.$store.state.chapterBannerActiveList[this.index];
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~/style/_ui.scss';

$red: #ba4141;
.chapter-banner-container {
  position: relative;
  // overflow: hidden;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bababa;
  background-color: #080808;
  margin-bottom: 48px;
  .chapter-line-top, .chapter-line-bottom {
    position: absolute;
    background-color: $red;
    width: 1px;
  }
  .chapter-line-top {
    right: 25px;
    top: 0;
    height: 250px;
    transform: translateY(-90%);
    @include pad {
      height: 350px;
    }
    @include pc {
      height: 350px;
    }
  }
  .chapter-line-bottom {
    right: 50%;
    bottom: 0;
    height: 100px;
    transform: translateY(50%);
    @include pc {
      height: 150px;
    }
  }

  .chapter-banner {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 15vh 0;
    @include pad {
      padding: 0 5%;
    }
    @include pc {
      padding: 150px 100px;
    }
  }
  .chapter-banner__left {
    opacity: 0;
    width: 20%;
    margin-right: 16px;
    text-align: right;
    @include pc {
      margin-right: 28px;
    }
    h3 {
      display: inline-block;
      margin-top: 0;
      color: $red;
      font-family: source-han-serif-tc;
      font-weight: 900;
      writing-mode: vertical-lr;
      letter-spacing: 0.8rem;
    }
  }
  .chapter-banner__right {
    position: relative;
    width: 80%;
    @include pad {
      width: 75%;
    }
    @include pc {
      width: 70%;
    }
    .chapter-banner__img-container {
      opacity: 0;
      position: relative;
      margin: 0;
      width: 100%;
      img {
        width: 100%;
        margin-bottom: 16px;
        @include pc {
          margin-bottom: 24px;
        }
      }
    }
    h2 {
      color: $red;
      white-space: pre-wrap;
      font-family: source-han-serif-tc;
      margin-bottom: 16px;
      @include pc {
        margin-bottom: 48px;
      }
    }
  }

  table {
    padding: 0 1.315rem;
    td {
      vertical-align: top;
      min-width: 70px;
      line-height: 1.7;
      li.li--white {
        color: #bababa;
      }
      li.li--grey {
        color: #767676;
      }
      .td-text {
        color: #bababa;
      }
    }
  }
}
</style>