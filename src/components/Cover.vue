<template lang="pug">
section.cover
  article.cover__block.cover__preamble
    slot(name="prembleTitle")
    slot(name="prembleText")
    footer.cover__preamble__arrow-container
      NmdArrow(iconColor="#cecece")
  div.cover__block.cover__collector-space#collector-space
  article.cover__block.cover__gate#gate
    div.cover__gate__bg(:class="{ 'cover__gate__bg--enlarge': !$store.state.isEnterMainContent }")
    header.cover__gate__title
      slot(name="gate")
    NmdArrow(iconColor="#cecece")
</template>

<script>
import ErikoScroller from '@/utils/scrollEvent.js';

import NmdArrow from '@/components/_common/pinhead/NmdArrow.vue';

export default {
  name: 'Cover',
  components: {
    NmdArrow,
  },
  data() {
    return {
      es: new ErikoScroller()
    }
  },
  computed: {
    observableScrollEventOption() {
      return {
        type: 'w',
        top: 0,
        bottom: 0,
        enterEvent: this.handleEnterEvent,
        leaveEvent: this.handleLeaveEvent,
        aboveEvent: this.handleAboveEvent,
        underEvent: this.handleUnderEvent,
      }
    },
  },
  watch: {
    
  },
  methods: {
    handleEnterEvent() {
      this.$store.dispatch('updatedIsEnterCollector', true);
      this.$store.dispatch('updatedIsEnterMainContent', false);
    },
    handleLeaveEvent() {
      this.$store.dispatch('updatedIsEnterCollector', false);
    },
    handleAboveEvent() {
      this.$store.dispatch('updatedIsEnterMainContent', false);
    },
    handleUnderEvent() {
      this.$store.dispatch('updatedIsEnterMainContent', true);
    }
  },
  mounted() {
    this.es.addObservableScrollEvent('#collector-space', this.observableScrollEventOption, true);
  },
  destroyed() {
    this.es.removeObservableScrollEvent('#collector-space', this.observableScrollEventOption, true);
  },
}
</script>

<style lang="scss" scoped>
.cover {
  position: relative;
  width: 100%;
  height: 300vh;
  .cover__block {
    width: 100%;
    height: 100vh;
  }
  .cover__preamble {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    padding-bottom: 10vh;
    background-color: #000000dd;
    h2 {
      font-family: source-han-seri-tc;
      font-weight: bold;
      text-align: center;
      margin-bottom: 32px;
    }
    p {
      text-align: center;
      br:nth-child(odd) {
        @include pc {
          display: none;
        }
      }
    }
    .cover__preamble__arrow-container {
      position: absolute;
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
    }
  }
  .collector-space {}
  .cover__gate {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding-bottom: 5vh;
    color: #f2e6e6;
    .cover__gate__bg {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100vh;
      background-image: url('../assets/img/gate/cover_door_mob.png');
      background-size: cover;
      background-position: center top;
      transition: .666s ease;
      @include pc {
        background-position: center;
        background-image: url('../assets/img/gate/cover_door_pc.png');
      }

      &.cover__gate__bg--enlarge {
        transform: scale(5);
        transform-origin: center 25%;
        @include pc {
          transform: scale(10);
          transform-origin: center center;
        }
      }
    }
    .cover__gate__title {
      position: relative;
    }
    h1 {
      font-family: source-han-seri-tc;
      font-weight: bold;
      margin-bottom: 32px;
      br:nth-child(2) {
        @include pc {
          display: none;
        }
      }
    }
  }
}
</style>