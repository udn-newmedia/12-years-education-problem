<template lang="pug">
section.cover#cover
  article.cover__block.cover__preamble(v-show="!$store.state.isEnterMainContent")
    slot(name="prembleTitle")
    slot(name="prembleText")
    footer.cover__preamble__arrow-container
      NmdArrow(iconColor="#cecece")
  article.cover__block.cover__gate#gate
    div.cover__collector-container(:class="{'cover__collector-container--fixed': !$store.state.isEnterMainContent}")
      Background
      CardCollector
    div.cover__gate__bg(:class="{ 'cover__gate__bg--enlarge': !$store.state.isEnterMainContent }")
      header.cover__gate__title
        slot(name="gate")
        div.cover__gate__title__arrow-container
          NmdArrow(iconColor="#cecece")
</template>

<script>
import { ErikoScroller } from 'eriko-scroller.js';

import Background from '@/components/card_collector/Background.vue';
import CardCollector from '@/components/card_collector/CardCollector.vue';
import NmdArrow from '@/components/_common/pinhead/NmdArrow.vue';

export default {
  name: 'Cover',
  components: {
    Background,
    CardCollector,
    NmdArrow,
  },
  data() {
    return {
      es: new ErikoScroller(),
    }
  },
  computed: {
    gateEventOption() {
      return {
        type: 'w',
        top: 1,
        bottom: 1,
        enterEvent: this.nothing,
        leaveEvent: this.handleGateLeaveEvent,
      }
    },
  },
  methods: {
    handleGateLeaveEvent() {
      // this.$store.dispatch('updatedIsEnterCollector', true)
    },
    nothing() {

    },
  },
  mounted() {
    this.es.addObservableScrollEvent('#cover', this.gateEventOption, true);
  },
  destroyed() {
    this.es.removeObservableScrollEvent('#cover', this.gateEventOption, true);
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
    background-color: #00000000;
    opacity: 0;
    animation: fade-in .1s .2s forwards;
    @keyframes fade-in {
      from {
        background-color: #00000000;
        opacity: 0;
      }
      to {
        background-color: #00000088;
        opacity: 1;
      }
    }

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
      background-position: center top;
      transition: 2s ease;
      transform-origin: center 20%;
      @include pc {
        background-position: center;
        background-image: url('../assets/img/gate/cover_door_pc.png');
        transform-origin: center;
      }

      &.cover__gate__bg--enlarge {
        transform: scale(7.5);
        transform-origin: center 25%;
        @include pc {
          transform: scale(10);
          transform-origin: center center;
        }
      }
    }
    .cover__gate__title {
      position: relative;
      .cover__gate__title__arrow-container {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
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