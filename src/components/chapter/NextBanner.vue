<template lang="pug">
article.article.next-banner-container(
  :data-nb-index="index"
  :class="{ 'clean-padding': next === null, 'fade-in-2': fadeInFlag }"
)
  section.next-banner(:class="{ 'clean-margin': next === null }")
    div.next-banner__conclusion
      header
        h2 亂象背後花多少錢
        h2.h2--red {{cost}}
      p {{description}}
      div.next-banner__line-top-container
        div.next-banner__line-top
      div.next-banner__line-bottom-container
        div.next-banner__line-bottom(:class="{ 'next-banner__line-bottom--active': fadeInFlag }")
    div.next-banner__next(v-if="next !== null")
      p 往下看
      p {{next}}
      div.next-banner__arrow
        NmdArrow(iconColor="#a72626")
</template>

<script>
import NmdArrow from '@/components/_common/pinhead/NmdArrow.vue';

export default {
  name: 'NextBanner',
  components: {
    NmdArrow,
  },
  props: {
    index: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    next: {
      type: String,
      default: null
    },
  },
  computed: {
    fadeInFlag() {
      return this.$store.state.nextChapterBannerActiveList[this.index];
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~/style/_ui.scss';

$red: #a72626;
.next-banner-container {
  opacity: 0;
  transform: translateY(50%);
  margin-top: 64px;
}
.next-banner {
  position: relative;
  width: 100%;
  margin-bottom: 128px;
}
.next-banner__conclusion {
  position: relative;
  background-color: #ffffff;
  padding: 72px 24px;
  margin: 0 auto;

  @include pc {
    width: 60%
  }
  header {
    margin-bottom: 32px;
  }
  h2 {
    font-family: source-han-serif-tc;
    text-align: center;
    margin: 0;
  }
  .h2--red {
    color: $red;
  }
}
.next-banner__next {
  margin: 96px auto;
  @include pc {
    width: 60%;
    margin: 128px auto;
  }
  p {
    margin-bottom: 0;
    text-align: center;
    font-weight: bold;
  }
  .next-banner__arrow {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
}

.next-banner__line-top-container, .next-banner__line-bottom-container {
  position: absolute;
  overflow: hidden;
  right: 50%;
  width: 1px;
  height: 128px;
  @include pc {
    height: 165px;
  }
}
.next-banner__line-top-container {
  top: 0;
  transform: translateY(-70%);
}

.next-banner__line-bottom-container {
  bottom: 0;
  transform: translateY(70%);
}

.next-banner__line-top, .next-banner__line-bottom {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $red;
  transition: .666s .666s;
}
.next-banner__line-bottom {
  transform: translateY(-100%);
  &.next-banner__line-bottom--active {
    transform: translateY(0);
  }
}
.clean-padding {
  padding-bottom: 0;
}
.clean-margin {
  margin-bottom: 72px;
  @include pc {
    margin-bottom: 96px;
  }
}
</style>