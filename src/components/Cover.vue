<template lang="pug">
section.cover#cover
  article.cover__block.cover__preamble(
    v-if="$store.state.isInFirstView"
    :style="{opacity: preambleOpacity}"
  )
    slot(name="prembleTitle")
    slot(name="prembleText")
    footer.cover__preamble__arrow-container
      p.small 下滑點按圖卡
      NmdArrow(iconColor="#cecece")
  article.cover__block.cover__gate#gate
    div.cover__collector-container(:class="{'cover__collector-container--fixed': !$store.state.isEnterMainContent}")
      StarBackground
      WhiteBackground
      CardCollector
    div.cover__gate__bg(:class="{ 'cover__gate__bg--enlarge': !$store.state.isEnterMainContent }")
    header.cover__gate__title(v-if="$store.state.isEnterMainContent")
      slot(name="gate")
      div.cover__gate__title__arrow-container
        NmdArrow(iconColor="#cecece")
</template>

<script>
import { ErikoScroller } from 'eriko-scroller.js';

import CardCollector from '@/components/collector/CardCollector.vue';
import NmdArrow from '@/components/_common/pinhead/NmdArrow.vue';
import StarBackground from '@/components/StarBackground.vue';
import WhiteBackground from '@/components/WhiteBackground.vue';

export default {
  name: 'Cover',
  components: {
    CardCollector,
    NmdArrow,
    StarBackground,
    WhiteBackground,
  },
  data() {
    return {
      es: new ErikoScroller(),
      preambleOpacity: 1,
    }
  },
  computed: {
    gateEventOption() {
      return {
        type: 'w',
        top: 1,
        bottom: 1.2,
        enterEvent: this.handleGateEnterEvent,
        leaveEvent: this.handleGateLeaveEvent,
      }
    },
  },
  methods: {
    handleGateEnterEvent() {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      this.preambleOpacity = (totalHeight - window.pageYOffset) / totalHeight;
    },
    handleGateLeaveEvent() {
      this.$store.dispatch('updatedIsInFirstView', false)
      this.$store.dispatch('updatedIsEnterCollector', true)
      this.es.removeObservableScrollEvent('#cover', this.gateEventOption);
    },
  },
  mounted() {
    this.es.addObservableScrollEvent('#cover', this.gateEventOption);
  },
  destroyed() {
    this.es.removeObservableScrollEvent('#cover', this.gateEventOption);
  },
}
</script>

<style lang="scss" scoped>
.cover {
  position: relative;
  width: 100%;
  .cover__block {
    width: 100%;
    height: 100vh;
  }
  .cover__preamble {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    padding-bottom: 10vh;
    background-color: rgba($color: #000000, $alpha: 0.8);

    h2 {
      font-family: source-han-serif-tc;
      font-weight: bold;
      text-align: center;
      margin-bottom: 32px;
    }
    p {
      text-align: center;
      color: #ae9f9f;
      br:nth-child(odd) {
        @include pc {
          display: none;
        }
      }
    }
    .cover__preamble__arrow-container {
      position: absolute;
      left: 0;
      bottom: 10%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        margin-bottom: 16px;
        color: #ffffff;
      }
    }
  }
  .cover__gate {
    position: relative;
    overflow: hidden;
    width: 100%;
    color: #f2e6e6;
    .cover__gate__bg {
      position: absolute;
      z-index: 8;
      pointer-events: none;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 5vh;
      background-image: url('../assets/img/gate/cover_door_mob.png');
      background-size: cover;
      background-position: center;
      // transition: 2s .5s ease;
      transition: 2s ease;
      transform-origin: center 25%;
      @include pad {
        background-image: url('../assets/img/gate/cover_door_pad.png');
      }
      @include pc {
        background-image: url('../assets/img/gate/cover_door_pc.png');
        transform-origin: center;
      }

      &.cover__gate__bg--enlarge {
        transform: scale(7.5);
        transform-origin: center 25%;
        @include pc {
          transform: scale(10);
          transform-origin: center;
        }
      }
    }
  }
  .cover__gate__title {
    position: absolute;
    z-index: 10;
    bottom: 90px;
    width: 100%;
    text-align: center;
    opacity: 0;
    animation: fade-in .5s 2s forwards;
    @include pad {
      bottom: 150px;
    }
    @include pc {
      bottom: 80px;
    }
    .cover__gate__title__arrow-container {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  h1 {
    font-family: source-han-serif-tc;
    font-weight: bold;
    margin-bottom: 32px;
    br:nth-child(2) {
      @include pc {
        display: none;
      }
    }
  }
}

.cover__collector-container {
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  &.cover__collector-container--fixed {
    position: fixed;
  }
}
</style>