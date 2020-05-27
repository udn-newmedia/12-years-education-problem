<template lang="pug">
article.article(:data-nb-index="index" :class="{ 'clean-padding': next === null }")
  section.next-banner(:class="{ 'clean-margin': next === null }")
    div.next-banner__conclusion
      header
        h2 亂象背後花多少錢
        h2.h2--red {{cost}}
      p {{description}}
      div.next-banner-line-top
      div.next-banner-line-bottom
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
$red: #a72626;
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
    font-family: source-han-seri-tc;
    text-align: center;
    margin: 0;
  }
  .h2--red {
    color: $red;
  }
}
.next-banner__next {
  margin: 80px auto;
  @include pc {
    width: 60%;
    margin: 96px auto;
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

.next-banner-line-top, .next-banner-line-bottom {
  position: absolute;
  background-color: $red;
  width: 1px;
  height: 128px;
  right: 50%;
  @include pc {
    height: 165px;
  }
}
.next-banner-line-top {
  top: 0;
  transform: translateY(-50%);
}
.next-banner-line-bottom {
  bottom: 0;
  transform: translateY(50%);
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